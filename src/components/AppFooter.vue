<script setup lang="ts">
import { SUPPORTED_FORMATS_TEXT } from '@/constants/fileConfig'
</script>

<template>
  <footer class="mt-auto border-t border-slate-200 bg-white/80">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
      <p class="text-xs sm:text-sm text-slate-500 text-center leading-relaxed">
        <el-icon class="align-middle mr-1 text-slate-400"><InfoFilled /></el-icon>
        支持格式：{{ SUPPORTED_FORMATS_TEXT }}
      </p>
      <p class="text-xs text-slate-400 text-center mt-2">
        文件仅在本地浏览器处理，不会上传至任何服务器
      </p>
    </div>
  </footer>
</template>
