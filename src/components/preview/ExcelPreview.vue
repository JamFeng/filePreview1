<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import * as XLSX from 'xlsx'
import { usePreviewStore } from '@/stores/previewStore'

const props = defineProps<{
  file: File
}>()

const previewStore = usePreviewStore()
const loading = ref(true)
const errorMsg = ref('')
const sheetNames = ref<string[]>([])
const activeSheet = ref('')
const tableHtml = ref('')

const hasSheets = computed(() => sheetNames.value.length > 0)

let workbook: XLSX.WorkBook | null = null

async function loadExcel(): Promise<void> {
  loading.value = true
  errorMsg.value = ''
  tableHtml.value = ''
  sheetNames.value = []
  activeSheet.value = ''

  try {
    const buffer = await props.file.arrayBuffer()
    workbook = XLSX.read(buffer, { type: 'array' })
    sheetNames.value = workbook.SheetNames

    if (sheetNames.value.length === 0) {
      errorMsg.value = 'Excel 文件中没有工作表'
      return
    }

    activeSheet.value = sheetNames.value[0]
    renderSheet(activeSheet.value)
  } catch (e) {
    errorMsg.value = e instanceof Error ? e.message : 'Excel 加载失败'
  } finally {
    loading.value = false
  }
}

function renderSheet(name: string): void {
  if (!workbook) return
  const sheet = workbook.Sheets[name]
  if (!sheet) return

  const html = XLSX.utils.sheet_to_html(sheet, { id: 'excel-table' })
  tableHtml.value = html.replace(
    /<table/g,
    '<table class="excel-preview-table"',
  )
}

function onSheetChange(name: string): void {
  activeSheet.value = name
  renderSheet(name)
}

onMounted(loadExcel)
watch(() => props.file, loadExcel)
</script>

<template>
  <div class="p-4 min-h-[300px] flex flex-col">
    <div v-if="loading" class="py-16 text-center flex-1">
      <el-icon class="is-loading text-3xl text-brand-500"><Loading /></el-icon>
      <p class="text-sm text-slate-500 mt-3">正在解析 Excel…</p>
    </div>

    <el-alert v-else-if="errorMsg" type="error" :title="errorMsg" show-icon />

    <template v-else-if="hasSheets">
      <div v-if="sheetNames.length > 1" class="mb-3 flex flex-wrap gap-2">
        <el-radio-group v-model="activeSheet" size="default" @change="onSheetChange">
          <el-radio-button v-for="name in sheetNames" :key="name" :value="name">
            {{ name }}
          </el-radio-button>
        </el-radio-group>
      </div>

      <div
        class="flex-1 overflow-auto bg-white rounded-lg border border-slate-200 p-2 shadow-sm transition-transform duration-150 origin-top-left"
        :style="{ transform: `scale(${previewStore.scale})` }"
        v-html="tableHtml"
      />
    </template>
  </div>
</template>
