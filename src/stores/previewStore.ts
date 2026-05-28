import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PreviewState } from '@/types/file'
import { useFileStore } from './fileStore'

const MIN_SCALE = 0.25
const MAX_SCALE = 4
const SCALE_STEP = 0.25

export const usePreviewStore = defineStore('preview', () => {
  const state = ref<PreviewState>({
    visible: false,
    fileId: null,
    scale: 1,
    pdfPage: 1,
    pdfTotalPages: 0,
  })

  const visible = computed(() => state.value.visible)
  const scale = computed(() => state.value.scale)
  const pdfPage = computed(() => state.value.pdfPage)
  const pdfTotalPages = computed(() => state.value.pdfTotalPages)

  const currentFile = computed(() => {
    if (!state.value.fileId) return undefined
    return useFileStore().getFileById(state.value.fileId)
  })

  function openPreview(fileId: string): void {
    state.value = {
      visible: true,
      fileId,
      scale: 1,
      pdfPage: 1,
      pdfTotalPages: 0,
    }
  }

  function closePreview(): void {
    state.value = {
      visible: false,
      fileId: null,
      scale: 1,
      pdfPage: 1,
      pdfTotalPages: 0,
    }
  }

  function setScale(value: number): void {
    state.value.scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))
  }

  function zoomIn(): void {
    setScale(state.value.scale + SCALE_STEP)
  }

  function zoomOut(): void {
    setScale(state.value.scale - SCALE_STEP)
  }

  function resetScale(): void {
    state.value.scale = 1
  }

  function setPdfPage(page: number): void {
    const total = state.value.pdfTotalPages
    if (total <= 0) {
      state.value.pdfPage = Math.max(1, page)
      return
    }
    state.value.pdfPage = Math.min(total, Math.max(1, page))
  }

  function setPdfTotalPages(total: number): void {
    state.value.pdfTotalPages = total
    if (state.value.pdfPage > total) {
      state.value.pdfPage = Math.max(1, total)
    }
  }

  function prevPdfPage(): void {
    setPdfPage(state.value.pdfPage - 1)
  }

  function nextPdfPage(): void {
    setPdfPage(state.value.pdfPage + 1)
  }

  return {
    state,
    visible,
    scale,
    pdfPage,
    pdfTotalPages,
    currentFile,
    openPreview,
    closePreview,
    setScale,
    zoomIn,
    zoomOut,
    resetScale,
    setPdfPage,
    setPdfTotalPages,
    prevPdfPage,
    nextPdfPage,
  }
})
