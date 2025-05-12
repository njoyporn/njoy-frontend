<script setup lang="ts">
    const props = defineProps<{
        title:string;
        style?:string;
    }>();

</script>

<template>
    <h2 class="w-full px-4 py-8 text-8xl text-white" :style="style">{{ title }}</h2>
</template>

<setup>

</setup>