<script setup lang="ts">
</script>

<template>
<div class="flex flex-wrap w-full h-screen">
    <div class="w-1/12 h-full">
        <slot name="sidebar"></slot>
    </div>
    <div class="w-11/12 h-full">
        <slot name="main-view"></slot>
    </div>
</div>
</template>

<style scoped>
</style>