<!-- 使用普通模板，不自定义布局，这样主题的导航栏会自动显示 -->
<script setup>
import { Content } from 'vuepress/client'
</script>

<template>
  <!-- 不使用自定义容器，让主题自动处理导航栏 -->
  <Content />
</template>
