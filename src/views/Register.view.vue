<script setup lang="ts">
    import NavbarLayout from '@/components/shared/layout/NavbarLayout.vue';
    import NavbarComponent from '@/components/shared/navbar/NavbarComponent.vue';
    import RegisterForm from '@/components/shared/forms/RegisterForm.vue';
</script>

<template>
    <NavbarLayout>
        <template v-slot:navbar><NavbarComponent :brandImage="'njoy-logo.png'"></NavbarComponent></template>
        <template v-slot:main><RegisterForm></RegisterForm></template>
    </NavbarLayout>
</template>

<style scoped>
</style>