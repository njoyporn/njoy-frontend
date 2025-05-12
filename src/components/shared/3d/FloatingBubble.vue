<script setup lang="ts">
    const props = defineProps<{
        position: {x:number, y:number}
        backgroundRGBA: string;
        content: string;
    }>();
</script>

<template>
    <div class="absolute w-80 max-h-40 p-4 bg-sky-500 bg-opacity-75 border-2 rounded-xl text-white font-semibold" 
         :style="
            `top: ${position.y}px; 
            left: ${position.x}px;
            background: ${backgroundRGBA}`"> 
         {{ content }}
         </div>
</template>

<style scoped>
</style>