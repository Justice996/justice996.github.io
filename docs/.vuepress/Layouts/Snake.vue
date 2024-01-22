<template>
    <Navbar/>
    <Content/>
  </template>
  
  <script>
  import { usePageData } from '@vuepress/client'
  import Navbar from '@theme/Navbar.vue'
  import { ref } from 'vue'
  export default {
    components: {
      Navbar // 官方原生的header,可以直接拿来用
    },
    setup() {
    }
  }
  </script>
  <style lang="scss" scoped>
  
  </style>
  