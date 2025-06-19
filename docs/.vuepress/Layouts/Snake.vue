<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>

<script>
import { usePageData, Content } from 'vuepress/client'
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  components: {
    Content
  },
  setup() {
    const isDarkMode = ref(false)
    
    onMounted(() => {
      const html = document.documentElement
      isDarkMode.value = html.classList.contains("dark")
      
      // 监听主题变化
      const observer = new MutationObserver(() => {
        isDarkMode.value = html.classList.contains("dark")
      })
      
      observer.observe(html, {
        attributeFilter: ["class"],
        attributes: true,
      })
      
      return () => {
        observer.disconnect()
      }
    })
    
    return {
      isDarkMode
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>
  