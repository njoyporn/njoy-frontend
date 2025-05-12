<script setup lang="ts">
</script>

<template>
    <div class="h-screen w-screen text-white flex flex-wrap">
        <div class="h-1by24 w-full">
            <slot name="navbar"></slot>
        </div>
        <div class="h-22by24 w-full flex flex-wrap">
            <slot name="main"></slot>
        </div>
        <div class="h-1by24 w-full flex flex-wrap">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style scoped>
</style>