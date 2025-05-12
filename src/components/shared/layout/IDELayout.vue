<script setup lang="ts">
</script>
<template>
<div class="grid grid-rows-[3rem_1fr_2rem] h-screen w-screen">
    <div class="w-full">
        <slot name="navbar"></slot>
    </div>
    <div class="h-full grid grid-cols-[6rem_18rem_1fr]" style="min-width: 0; min-height: 0;">
        <div class="h-full">
            <slot name="sidebar"></slot>
        </div>
        <div class="h-full overflow-y-auto">
            <slot name="explorer"></slot>
        </div>
        <div class="h-full">
            <slot name="editor"></slot>
        </div>
    </div>
    <div class="w-full">
        <slot name="footer"></slot>
    </div>
</div>
</template>

<style scoped>
</style>