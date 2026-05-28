/** 支持的文件扩展名 */
export const SUPPORTED_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'bmp',
  'svg',
  'pdf',
  'txt',
  'doc',
  'docx',
  'xls',
  'xlsx',
] as const

export type SupportedExtension = (typeof SUPPORTED_EXTENSIONS)[number]

/** 单文件最大体积（MB） */
export const MAX_FILE_SIZE_MB = 10

/** 单文件最大体积（字节） */
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

export const APP_NAME = '本地文件在线预览'

export const SUPPORTED_FORMATS_TEXT =
  '图片（JPG / PNG / GIF / WebP / BMP / SVG）、PDF、TXT、Word（DOC / DOCX）、Excel（XLS / XLSX）'

export const ACCEPT_MIME =
  'image/*,.pdf,.txt,.doc,.docx,.application/msword,.application/vnd.openxmlformats-officedocument.wordprocessingml.document,.xls,.xlsx,.application/vnd.ms-excel,.application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
