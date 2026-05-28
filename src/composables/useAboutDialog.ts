import { ref } from 'vue'

const aboutVisible = ref(false)

/** 全局「关于」弹窗状态，供 App 级挂载与头部导航触发 */
export function useAboutDialog() {
  function openAbout(): void {
    aboutVisible.value = true
  }

  function closeAbout(): void {
    aboutVisible.value = false
  }

  return {
    aboutVisible,
    openAbout,
    closeAbout,
  }
}
