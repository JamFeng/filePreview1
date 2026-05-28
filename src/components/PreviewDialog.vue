<script setup lang="ts">
import { computed, watch } from 'vue'
import PdfPreview from '@/components/preview/PdfPreview.vue'
import TextPreview from '@/components/preview/TextPreview.vue'
import DocxPreview from '@/components/preview/DocxPreview.vue'
import ExcelPreview from '@/components/preview/ExcelPreview.vue'
import { usePreviewStore } from '@/stores/previewStore'

const previewStore = usePreviewStore()

const currentFile = computed(() => previewStore.currentFile)
const isPdf = computed(() => currentFile.value?.category === 'pdf')
const scalePercent = computed(() => Math.round(previewStore.scale * 100))

function handleClose(): void {
  previewStore.closePreview()
}

watch(
  () => previewStore.visible,
  (visible) => {
    document.body.style.overflow = visible ? 'hidden' : ''
  },
)
</script>

<template>
  <el-dialog
    :model-value="previewStore.visible"
    :title="currentFile?.name ?? '文件预览'"
    fullscreen
    destroy-on-close
    class="preview-dialog"
    @update:model-value="(v: boolean) => !v && handleClose()"
    @close="handleClose"
  >
    <template v-if="currentFile">
      <!-- 工具栏 -->
      <div
        class="sticky top-0 z-10 -mx-4 sm:-mx-5 px-4 sm:px-5 py-2 mb-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      >
        <el-button-group>
          <el-button size="default" class="!min-h-[40px] !min-w-[40px]" @click="previewStore.zoomOut">
            <el-icon><ZoomOut /></el-icon>
          </el-button>
          <el-button size="default" class="!min-w-[64px] !min-h-[40px]" disabled>
            {{ scalePercent }}%
          </el-button>
          <el-button size="default" class="!min-h-[40px] !min-w-[40px]" @click="previewStore.zoomIn">
            <el-icon><ZoomIn /></el-icon>
          </el-button>
        </el-button-group>

        <el-button size="default" class="!min-h-[40px]" @click="previewStore.resetScale">
          <el-icon class="mr-1"><Refresh /></el-icon>
          重置
        </el-button>

        <template v-if="isPdf && previewStore.pdfTotalPages > 0">
          <el-divider direction="vertical" class="!h-6 hidden sm:block" />
          <el-button-group>
            <el-button
              size="default"
              class="!min-h-[40px]"
              :disabled="previewStore.pdfPage <= 1"
              @click="previewStore.prevPdfPage"
            >
              <el-icon><ArrowLeft /></el-icon>
            </el-button>
            <el-button size="default" class="!min-h-[40px] !min-w-[80px]" disabled>
              {{ previewStore.pdfPage }} / {{ previewStore.pdfTotalPages }}
            </el-button>
            <el-button
              size="default"
              class="!min-h-[40px]"
              :disabled="previewStore.pdfPage >= previewStore.pdfTotalPages"
              @click="previewStore.nextPdfPage"
            >
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </el-button-group>
        </template>

        <el-button type="danger" plain size="default" class="!min-h-[40px] ml-auto sm:ml-0" @click="handleClose">
          <el-icon class="mr-1"><Close /></el-icon>
          关闭
        </el-button>
      </div>

      <!-- 预览内容 -->
      <div class="preview-body overflow-auto max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-160px)] rounded-lg bg-slate-100 border border-slate-200">
        <PdfPreview v-if="currentFile.category === 'pdf'" :file="currentFile.file" />
        <TextPreview v-else-if="currentFile.category === 'text'" :file="currentFile.file" />
        <DocxPreview v-else-if="currentFile.category === 'word'" :file="currentFile.file" />
        <ExcelPreview v-else-if="currentFile.category === 'excel'" :file="currentFile.file" />
        <div v-else class="py-20 text-center text-slate-500">暂不支持该格式预览</div>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.preview-dialog .el-dialog__body {
  padding-top: 8px;
}
</style>
