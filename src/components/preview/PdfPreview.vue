<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist'
import { usePreviewStore } from '@/stores/previewStore'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const props = defineProps<{
  file: File
}>()

const previewStore = usePreviewStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const errorMsg = ref('')

let pdfDoc: PDFDocumentProxy | null = null
let renderTask: RenderTask | null = null

async function loadPdf(): Promise<void> {
  loading.value = true
  errorMsg.value = ''

  try {
    if (pdfDoc) {
      await pdfDoc.destroy()
      pdfDoc = null
    }

    const buffer = await props.file.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument({ data: buffer })
    pdfDoc = await loadingTask.promise
    previewStore.setPdfTotalPages(pdfDoc.numPages)
    await renderPage()
  } catch (e) {
    errorMsg.value = e instanceof Error ? e.message : 'PDF 加载失败'
  } finally {
    loading.value = false
  }
}

async function renderPage(): Promise<void> {
  if (!pdfDoc || !canvasRef.value) return

  const page = await pdfDoc.getPage(previewStore.pdfPage)
  const scale = previewStore.scale * 1.5
  const viewport = page.getViewport({ scale })

  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  if (!context) return

  canvas.height = viewport.height
  canvas.width = viewport.width

  renderTask?.cancel()

  renderTask = page.render({
    canvasContext: context,
    viewport,
  })
  await renderTask.promise
}

watch(() => props.file, loadPdf)
watch(() => previewStore.pdfPage, renderPage)
watch(() => previewStore.scale, renderPage)

onMounted(loadPdf)

onUnmounted(() => {
  pdfDoc?.destroy()
})
</script>

<template>
  <div class="flex flex-col items-center p-4 min-h-[300px]">
    <div v-if="loading" class="py-16">
      <el-icon class="is-loading text-3xl text-brand-500"><Loading /></el-icon>
      <p class="text-sm text-slate-500 mt-3">正在加载 PDF…</p>
    </div>
    <el-alert v-else-if="errorMsg" type="error" :title="errorMsg" show-icon class="max-w-md" />
    <canvas
      v-show="!loading && !errorMsg"
      ref="canvasRef"
      class="shadow-md bg-white max-w-full h-auto"
    />
  </div>
</template>
