<script setup lang="ts">
</script>

<template>
    <div class="h-1by24 fixed z-20 w-full">
        <slot name="navbar"></slot>
    </div>
    <div class="h-23by24">
        <div class="w-full h-full">
            <slot name="main"></slot>
        </div>
    </div>
</template>

<style scoped>
</style>