<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <header>
    <div>
      <NavigationBar />
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style></style>