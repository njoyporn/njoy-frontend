<script setup lang="ts">
    import { onMounted, useTemplateRef } from "vue";
    import type { Video } from '@/types/video.type';
    import MiniPlayerComponent from './MiniPlayerComponent.vue';
    import type { Links } from "@/types/core.types";

    const props = defineProps<{
        videos: Video[];
        titleText: string;
        links:Links
    }>()

    const emit = defineEmits<{
        (e: "loadNext"): void;
        (e: "loadPrev"): void;
    }>()

    // const list = useTemplateRef<HTMLElement>("list");
    // can not call methods scrollIntoView on list if referenced as template ref.
    let list: HTMLElement

    onMounted(()=>{
        const element: HTMLElement | null = document.getElementById("list");
        if(!element) return;
        list = element;
    })

    function onmouseover(): void {
        if(!list) return;
        list.scrollIntoView();
    }

    function nextPage(): void {
        if(props.links.next == "") return;
        emit("loadNext")
    }
    function prevPage(): void {
        if(props.links.prev = "") return;
        emit("loadPrev")
    }

</script>

<template>
    <div class="w-full h-3by24 relative bg-pg-gray-gradient-10 px-40">
        <h3 class="w-full text-6xl font-semibold"> Result for: {{ titleText }}</h3>
    </div>
    <div id="list" class="w-full h-20by24 flex flex-wrap justify-center items-start gap-12 relative bg-pg-dark" @mouseenter="onmouseover()">
        <MiniPlayerComponent v-for="(video, i) of videos" :key="i" :video="video" :wrapperClasses="'max-h-[18rem]'"></MiniPlayerComponent>
    </div>
    <div class="w-full grid grid-cols-[1fr_1fr] h-3by24 bg-pg-dark justify-around">
        <button v-if="links.prev != ''" class="w-full flex justify-center h-40 items-center"><img src="/icons/prev.svg" @click="prevPage()"></button><div v-else></div>
        <button v-if="links.next  != ''" class="w-full flex justify-center h-40 items-center"><img src="/icons/next.svg" @click="nextPage()"></button><div v-else></div>
    </div>
</template>

<style scoped>
</style>