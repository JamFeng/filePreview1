import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { FileItem } from '@/types/file'
import { getExtension, getFileCategory, validateFile } from '@/utils/fileValidate'

export const useFileStore = defineStore('file', () => {
  const files = ref<FileItem[]>([])

  const fileCount = computed(() => files.value.length)
  const hasFiles = computed(() => files.value.length > 0)

  function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  }

  function addFiles(rawFiles: File[]): string[] {
    const errors: string[] = []

    for (const file of rawFiles) {
      const result = validateFile(file)
      if (!result.valid) {
        errors.push(result.message ?? '未知错误')
        continue
      }

      const ext = getExtension(file.name)
      const item: FileItem = {
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        extension: ext,
        category: getFileCategory(ext),
        addedAt: Date.now(),
      }
      files.value.push(item)
    }

    return errors
  }

  function removeFile(id: string): void {
    files.value = files.value.filter((f) => f.id !== id)
  }

  function clearAll(): void {
    files.value = []
  }

  function getFileById(id: string): FileItem | undefined {
    return files.value.find((f) => f.id === id)
  }

  return {
    files,
    fileCount,
    hasFiles,
    addFiles,
    removeFile,
    clearAll,
    getFileById,
  }
})
