<script setup lang="ts">
import { APP_NAME } from '@/constants/fileConfig'
import { useAboutDialog } from '@/composables/useAboutDialog'

const { openAbout } = useAboutDialog()
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm"
  >
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
      <div class="flex items-center gap-2 sm:gap-3 min-w-0">
        <div
          class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-500 flex items-center justify-center shrink-0"
        >
          <el-icon class="text-white text-lg"><Document /></el-icon>
        </div>
        <h1 class="text-base sm:text-lg font-semibold text-slate-800 truncate">
          {{ APP_NAME }}
        </h1>
      </div>

      <nav class="flex items-center shrink-0">
        <el-button text class="!text-slate-600" @click="openAbout">
          <el-icon class="mr-1"><InfoFilled /></el-icon>
          关于
        </el-button>
      </nav>
    </div>
  </header>
</template>
