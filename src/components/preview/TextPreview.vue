<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { usePreviewStore } from '@/stores/previewStore'

const props = defineProps<{
  file: File
}>()

const previewStore = usePreviewStore()
const content = ref('')
const loading = ref(true)
const errorMsg = ref('')

async function loadText(): Promise<void> {
  loading.value = true
  errorMsg.value = ''
  try {
    content.value = await props.file.text()
  } catch (e) {
    errorMsg.value = e instanceof Error ? e.message : '文本读取失败'
  } finally {
    loading.value = false
  }
}

onMounted(loadText)
watch(() => props.file, loadText)
</script>

<template>
  <div class="p-4 sm:p-6 min-h-[300px]">
    <div v-if="loading" class="py-16 text-center">
      <el-icon class="is-loading text-3xl text-brand-500"><Loading /></el-icon>
    </div>
    <el-alert v-else-if="errorMsg" type="error" :title="errorMsg" show-icon />
    <pre
      v-else
      class="bg-white rounded-lg border border-slate-200 p-4 sm:p-6 text-sm text-slate-700 whitespace-pre-wrap break-words font-mono leading-relaxed shadow-sm origin-top-left transition-transform duration-150"
      :style="{ transform: `scale(${previewStore.scale})`, transformOrigin: 'top left' }"
    >{{ content }}</pre>
  </div>
</template>
