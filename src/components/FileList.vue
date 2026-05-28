<script setup lang="ts">
import { computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import FileListItem from './FileListItem.vue'
import { useFileStore } from '@/stores/fileStore'
import { usePreviewStore } from '@/stores/previewStore'

const fileStore = useFileStore()
const previewStore = usePreviewStore()

const sortedFiles = computed(() =>
  [...fileStore.files].sort((a, b) => b.addedAt - a.addedAt),
)

function handleClearAll(): void {
  ElMessageBox.confirm('确定清空全部文件吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(() => {
      if (previewStore.visible) previewStore.closePreview()
      fileStore.clearAll()
    })
    .catch(() => undefined)
}
</script>

<template>
  <section class="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
    <div
      class="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-100 flex items-center justify-between gap-3"
    >
      <div class="flex items-center gap-2 min-w-0">
        <el-icon class="text-brand-600 text-lg shrink-0"><FolderOpened /></el-icon>
        <h2 class="text-base font-semibold text-slate-800 truncate">文件列表</h2>
        <el-tag v-if="fileStore.hasFiles" size="small" type="info" round>
          {{ fileStore.fileCount }}
        </el-tag>
      </div>
      <el-button
        v-if="fileStore.hasFiles"
        type="danger"
        link
        size="small"
        class="shrink-0"
        @click="handleClearAll"
      >
        清空全部
      </el-button>
    </div>

    <div v-if="!fileStore.hasFiles" class="py-16 text-center text-slate-400">
      <el-icon class="text-5xl mb-3 opacity-40"><Folder /></el-icon>
      <p class="text-sm">暂无文件，请先上传</p>
    </div>

    <TransitionGroup v-else name="fade" tag="ul" class="mt-0 pl-0 divide-y divide-slate-100 list-none">
      <FileListItem
        v-for="item in sortedFiles"
        :key="item.id"
        :item="item"
        class="block"
      />
    </TransitionGroup>
  </section>
</template>
