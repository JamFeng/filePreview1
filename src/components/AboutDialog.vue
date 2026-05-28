<script setup lang="ts">
import { useAboutDialog } from '@/composables/useAboutDialog'

const { aboutVisible, closeAbout } = useAboutDialog()
</script>

<template>
  <el-dialog
    v-model="aboutVisible"
    title="关于应用"
    width="90%"
    append-to-body
    align-center
    :z-index="3000"
    style="max-width: 420px"
    @close="closeAbout"
  >
    <p class="text-slate-600 text-sm leading-relaxed">
      纯前端本地文件预览工具，文件仅在浏览器内处理，不会上传至服务器。支持图片、PDF、文本、Word、Excel
      等常见格式。
    </p>
    <template #footer>
      <el-button type="primary" @click="closeAbout">知道了</el-button>
    </template>
  </el-dialog>
</template>
