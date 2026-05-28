<script setup lang="ts">
import { computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { FileItem } from '@/types/file'
import { formatFileSize, formatDate } from '@/utils/fileValidate'
import { useImagePreview } from '@/composables/useImagePreview'
import { useFileStore } from '@/stores/fileStore'
import { usePreviewStore } from '@/stores/previewStore'

const props = defineProps<{
  item: FileItem
}>()

const fileStore = useFileStore()
const previewStore = usePreviewStore()
const { openImagePreview } = useImagePreview()

const categoryLabel = computed(() => {
  const map: Record<FileItem['category'], string> = {
    image: '图片',
    pdf: 'PDF',
    text: '文本',
    word: 'Word',
    excel: 'Excel',
    unknown: '未知',
  }
  return map[props.item.category]
})

const categoryType = computed(() => {
  const map: Record<FileItem['category'], '' | 'success' | 'warning' | 'danger' | 'info'> = {
    image: 'success',
    pdf: 'danger',
    text: 'info',
    word: '',
    excel: 'warning',
    unknown: 'info',
  }
  return map[props.item.category]
})

function handlePreview(): void {
  if (props.item.category === 'image') {
    openImagePreview(props.item.file)
    return
  }
  previewStore.openPreview(props.item.id)
}

function handleRemove(): void {
  ElMessageBox.confirm(`确定删除文件「${props.item.name}」吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      if (previewStore.state.fileId === props.item.id) {
        previewStore.closePreview()
      }
      fileStore.removeFile(props.item.id)
    })
    .catch(() => undefined)
}
</script>

<template>
  <li
    class="group px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-slate-50/80 transition-colors"
  >
    <div class="flex items-center gap-3 min-w-0">
      <!-- 文件类型图标 -->
      <div
        class="w-9 h-9 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-brand-600 group-hover:border-brand-100 group-hover:bg-brand-50/50 transition-colors"
      >
        <el-icon class="text-lg">
          <Picture v-if="item.category === 'image'" />
          <Document v-else-if="item.category === 'pdf'" />
          <Tickets v-else-if="item.category === 'text'" />
          <Reading v-else-if="item.category === 'word'" />
          <Grid v-else-if="item.category === 'excel'" />
          <QuestionFilled v-else />
        </el-icon>
      </div>

      <!-- 文件信息 -->
      <div class="flex-1 min-w-0">
        <p
          class="text-sm font-medium text-slate-800 truncate leading-snug"
          :title="item.name"
        >
          {{ item.name }}
        </p>
        <div class="mt-1 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-xs text-slate-400">
          <el-tag :type="categoryType" size="small" effect="plain" class="!h-5">
            {{ categoryLabel }}
          </el-tag>
          <span class="text-slate-300 select-none" aria-hidden="true">·</span>
          <span>{{ formatFileSize(item.size) }}</span>
          <span class="text-slate-300 select-none hidden sm:inline" aria-hidden="true">·</span>
          <span class="hidden sm:inline tabular-nums">{{ formatDate(item.addedAt) }}</span>
        </div>
      </div>

      <!-- 操作按钮（仅图标、无背景） -->
      <div class="flex items-center gap-0.5 shrink-0">
        <el-button
          text
          size="small"
          class="!text-brand-600 hover:!text-brand-700"
          title="预览"
          aria-label="预览"
          @click="handlePreview"
        >
          <el-icon class="text-base"><View /></el-icon>
        </el-button>
        <el-button
          text
          size="small"
          class="!text-red-500 hover:!text-red-600"
          title="删除"
          aria-label="删除"
          @click="handleRemove"
        >
          <el-icon class="text-base"><Delete /></el-icon>
        </el-button>
      </div>
    </div>
  </li>
</template>
