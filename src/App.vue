<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <Toaster richColors position="top-right" closeButton />
  <RouterView />
</template>


