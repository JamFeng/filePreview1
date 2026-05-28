/** 文件预览类型分类 */
export type FileCategory = 'image' | 'pdf' | 'text' | 'word' | 'excel' | 'unknown'

/** 列表中的文件项 */
export interface FileItem {
  id: string
  file: File
  name: string
  size: number
  extension: string
  category: FileCategory
  addedAt: number
}

/** 预览弹窗状态 */
export interface PreviewState {
  visible: boolean
  fileId: string | null
  scale: number
  pdfPage: number
  pdfTotalPages: number
}
