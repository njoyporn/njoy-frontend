<script setup lang="ts">
  import NavbarLayout from '@/components/shared/layout/NavbarLayout.vue';
  import NavbarComponent from '@/components/shared/navbar/NavbarComponent.vue';
  import { onMounted, ref } from 'vue';
  const isLoading = ref<boolean>(true)


  onMounted(()=>{
    isLoading.value = false;
  })

</script>

<template>
  <NavbarLayout>
    <template #navbar><NavbarComponent :brandImage="'njoy-logo.png'" /></template>
    <template #main><router-view></router-view></template>
  </NavbarLayout>
</template>

<style>
  .slide-fade-enter-active {
  transition: all 0.8s ease-out;
  }

  .slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
  opacity: 0;
  }
</style>
