<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { renderAsync } from 'docx-preview'
import { usePreviewStore } from '@/stores/previewStore'

const props = defineProps<{
  file: File
}>()

const previewStore = usePreviewStore()
const containerRef = ref<HTMLElement | null>(null)
const loading = ref(true)
const errorMsg = ref('')

async function loadDocx(): Promise<void> {
  loading.value = true
  errorMsg.value = ''

  await nextTick()
  const container = containerRef.value
  if (!container) return

  container.innerHTML = ''

  try {
    const ext = props.file.name.split('.').pop()?.toLowerCase()
    if (ext === 'doc') {
      errorMsg.value = '旧版 .doc 格式暂不支持在线预览，请转换为 .docx 后重试'
      return
    }

    const buffer = await props.file.arrayBuffer()
    await renderAsync(buffer, container, undefined, {
      className: 'docx',
      inWrapper: true,
      ignoreWidth: false,
      ignoreHeight: false,
      renderHeaders: true,
      renderFooters: true,
      breakPages: true,
    })
  } catch (e) {
    errorMsg.value = e instanceof Error ? e.message : 'Word 文档加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(loadDocx)
watch(() => props.file, loadDocx)
watch(
  () => previewStore.scale,
  () => {
    if (containerRef.value) {
      containerRef.value.style.transform = `scale(${previewStore.scale})`
      containerRef.value.style.transformOrigin = 'top center'
    }
  },
)

onUnmounted(() => {
  if (containerRef.value) containerRef.value.innerHTML = ''
})
</script>

<template>
  <div class="p-4 min-h-[300px]">
    <div v-if="loading" class="py-16 text-center">
      <el-icon class="is-loading text-3xl text-brand-500"><Loading /></el-icon>
      <p class="text-sm text-slate-500 mt-3">正在解析 Word 文档…</p>
    </div>
    <el-alert v-else-if="errorMsg" type="warning" :title="errorMsg" show-icon class="max-w-lg mx-auto" />
    <div
      v-show="!loading && !errorMsg"
      ref="containerRef"
      class="docx-container mx-auto transition-transform duration-150 overflow-auto"
      :style="{ transform: `scale(${previewStore.scale})`, transformOrigin: 'top center' }"
    />
  </div>
</template>
