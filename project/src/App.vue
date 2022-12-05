<template>
  <div>
    <header-layout></header-layout>
    <div class="container">
      <router-view />
    </div>
    <footer-layout></footer-layout>
  </div>
</template>

<script>
import HeaderLayout from '@/components/layouts/HeaderLayout.vue'
import FooterLayout from '@/components/layouts/FooterLayout.vue'

export default {
  components: { HeaderLayout, FooterLayout }
}
</script>

<style></style>
