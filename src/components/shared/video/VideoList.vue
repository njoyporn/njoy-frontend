<script setup lang="ts">
    import type { Video } from '@/types/video.type';
    import MiniPlayerComponent from './MiniPlayerComponent.vue';

    const props = defineProps<{
        list: Video[]
        classes?: string;
        deletable?: boolean;
    }>()

    const emit = defineEmits<{
        (e: "delFavourite", id: string): void;
        (e: "addFavourite", video: Video): void;
    }>()

    function addFavourite(favourite: Video): void {
        emit('addFavourite', favourite);
    }
    function delFavourite(id: string): void {
        emit('delFavourite', id)
    }

    function deriveClasses(): string {
        const calculatedClasses: string = props.list.length > 5 ? 'overflow-x-auto' : (props.list.length == 5 ? 'justify-between' : 'justify-start');
        if (props.classes) return `${props.classes} ${calculatedClasses}`;
        return calculatedClasses;
    }
</script>

<template>
    <div class="w-full h-full lg:flex grid overflow-x-auto relative items-center gap-12 lg:pl-32 p-16 z-50" :class="deriveClasses()">
        <MiniPlayerComponent v-for="(video, i) of list" :key="i" :video="video" @addFavourite="addFavourite($event)" @delFavourite="delFavourite($event)" :deletable="deletable"></MiniPlayerComponent>
    </div>
</template>

<style scoped>
</style>