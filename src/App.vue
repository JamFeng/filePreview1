<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AboutDialog from '@/components/AboutDialog.vue'
import ImagePreviewViewer from '@/components/ImagePreviewViewer.vue'
import FileUpload from '@/components/FileUpload.vue'
import FileList from '@/components/FileList.vue'
import PreviewDialog from '@/components/PreviewDialog.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <FileUpload />
      <FileList />
    </main>
    <AppFooter />
    <AboutDialog />
    <ImagePreviewViewer />
    <PreviewDialog />
  </div>
</template>
