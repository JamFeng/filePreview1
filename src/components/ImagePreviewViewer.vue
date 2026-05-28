<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { ImageInstance } from 'element-plus'
import { useImagePreview } from '@/composables/useImagePreview'

const { imageUrl, previewSrcList, pendingOpen, markPreviewOpened, onPreviewClose } =
  useImagePreview()

const imageRef = ref<ImageInstance>()

watch(pendingOpen, async (pending) => {
  if (!pending || !imageUrl.value) return
  await nextTick()
  imageRef.value?.showPreview()
  markPreviewOpened()
})
</script>

<template>
  <!-- 隐藏 el-image，通过 showPreview 触发 Element Plus 大图预览 -->
  <div class="fixed w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
    <el-image
      v-if="imageUrl"
      ref="imageRef"
      :src="imageUrl"
      :preview-src-list="previewSrcList"
      preview-teleported
      hide-on-click-modal
      :z-index="3100"
      fit="contain"
      @close="onPreviewClose"
    />
  </div>
</template>
