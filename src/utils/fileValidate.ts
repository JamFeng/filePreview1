import {
  MAX_FILE_SIZE,
  SUPPORTED_EXTENSIONS,
  type SupportedExtension,
} from '@/constants/fileConfig'
import type { FileCategory } from '@/types/file'

export interface ValidateResult {
  valid: boolean
  message?: string
}

export function getExtension(fileName: string): string {
  const parts = fileName.split('.')
  if (parts.length < 2) return ''
  return parts.pop()?.toLowerCase() ?? ''
}

export function getFileCategory(ext: string): FileCategory {
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg']
  if (imageExts.includes(ext)) return 'image'
  if (ext === 'pdf') return 'pdf'
  if (ext === 'txt') return 'text'
  if (ext === 'doc' || ext === 'docx') return 'word'
  if (ext === 'xls' || ext === 'xlsx') return 'excel'
  return 'unknown'
}

export function isSupportedExtension(ext: string): ext is SupportedExtension {
  return (SUPPORTED_EXTENSIONS as readonly string[]).includes(ext)
}

export function validateFile(file: File): ValidateResult {
  const ext = getExtension(file.name)

  if (!ext) {
    return { valid: false, message: `文件「${file.name}」缺少扩展名，无法识别格式` }
  }

  if (!isSupportedExtension(ext)) {
    return {
      valid: false,
      message: `文件「${file.name}」格式不支持，请上传支持的文件类型`,
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    const limitMb = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)
    return {
      valid: false,
      message: `文件「${file.name}」超过 ${limitMb}MB 大小限制`,
    }
  }

  if (file.size === 0) {
    return { valid: false, message: `文件「${file.name}」为空，无法预览` }
  }

  return { valid: true }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
