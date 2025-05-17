<script setup lang="ts">
    import NavbarLayout from '@/components/shared/layout/NavbarLayout.vue';
    import NavbarComponent from '@/components/shared/navbar/NavbarComponent.vue';
</script>

<template>
    <NavbarLayout>
        <template #navbar><NavbarComponent :brandImage="'../njoy-logo.png'" /></template>
        <template #main><router-view></router-view></template>
    </NavbarLayout>
</template>

<style scoped>
</style>