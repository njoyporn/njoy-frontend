<script setup lang="ts">
</script>

<template>
    <div class="h-1by12">
        <slot name="navbar"></slot>
    </div>
    <div class="h-11by12 flex">
        <div class="w-1/12 max-sm:hidden">
            <slot name="sidebar"></slot>
        </div>
        <div class="w-11/12 max-sm:w-full">
            <slot name="main"></slot>
        </div>
    </div>
</template>

<style scoped>
</style>