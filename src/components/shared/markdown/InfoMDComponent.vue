<script setup lang="ts">
    import { resolveIconSrc } from '@/components/shared/utils/images.utils';
    import type { Info, ISeverity } from './editor.type';

    const props = defineProps<{
        info: Info
    }>()

    function deriveIcon(severity: ISeverity): string {
        switch(severity) {
            case "Info": return "info.svg";
            default: return "info.svg";
        }
    }

    function deriveClasses(severity: ISeverity): string {
        switch(severity) {
            case "Info": return "bg-sky-950 border-sky-800";
            default: return "info.svg";
        }
    }
</script>

<template>
    <div class="ml-10 h-20 flex items-center border rounded-l-md " :class="deriveClasses(info.severity)">
        <img class="h-12 pl-4" :src="resolveIconSrc(deriveIcon(info.severity))">
        <p class="pl-4" :class="info.classes" :style="info.style" v-text="info.content"></p>
    </div>
</template>

<style scoped>
</style>