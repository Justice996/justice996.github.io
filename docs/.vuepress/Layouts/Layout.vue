<script setup>
import { Navbar, Sidebar, Content } from 'vuepress-theme-hope/client'
</script>

<template>
  <div class="theme-container">
    <Navbar />
    <div class="theme-content">
      <Content />
    </div>
  </div>
</template>

<style>
.theme-container {
  padding-top: 3.6rem;
  min-height: 100vh;
}
</style>