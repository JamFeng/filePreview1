<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ACCEPT_MIME, MAX_FILE_SIZE_MB } from '@/constants/fileConfig'
import { useFileStore } from '@/stores/fileStore'

const fileStore = useFileStore()
const isDragging = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

function processFiles(fileList: FileList | File[]): void {
  const arr = Array.from(fileList)
  if (arr.length === 0) return

  const errors = fileStore.addFiles(arr)
  if (errors.length > 0) {
    ElMessage({
      type: 'warning',
      message: errors.join('\n'),
      duration: 5000,
      showClose: true,
    })
  }
  const successCount = arr.length - errors.length
  if (successCount > 0) {
    ElMessage.success(`成功添加 ${successCount} 个文件`)
  }
}

function onInputChange(e: Event): void {
  const input = e.target as HTMLInputElement
  if (input.files) processFiles(input.files)
  input.value = ''
}

function onDrop(e: DragEvent): void {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer?.files) processFiles(e.dataTransfer.files)
}

function onDragOver(e: DragEvent): void {
  e.preventDefault()
  isDragging.value = true
}

function onDragLeave(): void {
  isDragging.value = false
}

function triggerSelect(): void {
  fileInputRef.value?.click()
}
</script>

<template>
  <section
    class="rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none"
    :class="
      isDragging
        ? 'border-brand-500 bg-brand-50 scale-[1.01]'
        : 'border-slate-300 bg-white hover:border-brand-500 hover:bg-slate-50'
    "
    @click="triggerSelect"
    @drop="onDrop"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
  >
    <input
      ref="fileInputRef"
      type="file"
      multiple
      class="hidden"
      :accept="ACCEPT_MIME"
      @change="onInputChange"
    />

    <div class="py-10 sm:py-14 px-4 flex flex-col items-center text-center">
      <div
        class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4"
      >
        <el-icon class="text-3xl sm:text-4xl text-brand-600"><UploadFilled /></el-icon>
      </div>
      <p class="text-base sm:text-lg font-medium text-slate-700 mb-1">
        点击或拖拽文件到此处上传
      </p>
      <p class="text-xs sm:text-sm text-slate-500">
        支持多文件同时上传，单文件最大 {{ MAX_FILE_SIZE_MB }}MB
      </p>
      <el-button type="primary" class="mt-5 !min-h-[40px] !px-6" @click.stop="triggerSelect">
        选择文件
      </el-button>
    </div>
  </section>
</template>
