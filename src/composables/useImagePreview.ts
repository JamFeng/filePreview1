import { ref, nextTick } from 'vue'

const imageUrl = ref('')
const previewSrcList = ref<string[]>([])
const pendingOpen = ref(false)

function revokeUrl(): void {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
    imageUrl.value = ''
    previewSrcList.value = []
  }
}

/** 全局图片大图预览（基于 el-image 预览能力） */
export function useImagePreview() {
  async function openImagePreview(file: File): Promise<void> {
    revokeUrl()
    pendingOpen.value = false
    await nextTick()
    const url = URL.createObjectURL(file)
    imageUrl.value = url
    previewSrcList.value = [url]
    pendingOpen.value = true
  }

  function markPreviewOpened(): void {
    pendingOpen.value = false
  }

  function onPreviewClose(): void {
    pendingOpen.value = false
    revokeUrl()
  }

  return {
    imageUrl,
    previewSrcList,
    pendingOpen,
    openImagePreview,
    markPreviewOpened,
    onPreviewClose,
  }
}
