<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import PlayButtonComponent from '../buttons/PlayButtonComponent.vue';
    import { VideoAPI } from '@/api/video/video.api';
    import type { Video } from '@/types/video.type';
    import { FavouriteManager } from '@/services/favourite.service';


    const emit = defineEmits<{
        (e: "update:isLoading", isLoading: boolean): void;
        (e: 'addFavourite'): void;
    }>()

    const isLoading = ref<boolean>(true);
    const randomVideo = ref<Video | null>()

    onMounted(async() => {
        const randomVideos: Video[] | null = await VideoAPI.getRandomVideos();
        if(!randomVideos) return;
        randomVideo.value = randomVideos[0];
        isLoading.value = false;
        emit("update:isLoading", isLoading.value);
        await new Promise(resolve => setTimeout(resolve, 4500));
        const videoElement: HTMLVideoElement | null = document.getElementById("header-video") as HTMLVideoElement;
        if(!videoElement) return;
        videoElement.play()
    })

    function deriveWatchURL(): string {
        if(!randomVideo.value) return "";
        // return `http://localhost:6692/api/v1/watch?id=${props.video.id}`
        return `https://api.njoyporn.com/api/v1/watch?id=${randomVideo.value.id}`
    }

    function deriveThumbnailURL(): string {
        if(!randomVideo.value) return "";
        // return `http://localhost:6692/api/v1/image?id=${props.video.id}&iid=0`
        return `https://api.njoyporn.com/api/v1/image?id=${randomVideo.value.id}&iid=0`
    }

    function playVideo(): void {
        const videoElement: HTMLVideoElement | null = document.getElementById("video") as HTMLVideoElement;
        if(!videoElement) return;
        videoElement.volume = 0;
        videoElement.play();
    }
    function pauseVideo(): void {
        const videoElement: HTMLVideoElement | null = document.getElementById("video") as HTMLVideoElement;
        if(!videoElement) return;
        videoElement.pause();
    }
    function deriveLink(): string {
        if(!randomVideo.value) return "/";
        // return document.location.href.includes('localhost') ? `/watch/${randomVideo.value.id}`: `https://beta.njoyporn.com/watch/${randomVideo.value.id}`;
        return `/watch/${randomVideo.value.id}`;
    }

    function addFavourite(): void {
        if(!randomVideo.value) return;
        FavouriteManager.addFavourite(randomVideo.value);
        emit('addFavourite');
    }
</script>

<template>
    <div class="w-full lg:h-3/5 h-1/4 relative" @mouseout="pauseVideo()" @mouseover="playVideo()">
        <div v-if="randomVideo"class="absolute top-0 left-0 w-full h-full bg-pg-dark-gradient-10 z-10 p-4 lg:pt-24 lg:pl-24 ">
            <img class="lg:h-1/3 h-1/6 lg:mb-8 lg:pb-16" src="/njoy-logo.png">
            <h3 class="lg:text-6xl text-2xl font-semibold lg:pt-0 pt-3 h-1/6 capitalize" v-text="randomVideo.title"></h3>
            <p class="lg:w-1/2 lg:text-3xl text-xl font-semibold mb-4 lg:min-h-40 lg:max-h-40 break-words overflow-auto capitalize" v-text="randomVideo.description"></p>
            <div class="w-full grid lg:grid-cols-[9rem_auto] grid-cols-[3.5rem_auto] gap-4">
                <img class="hover:scale-125 z-20 lg:-mt-3 lg:self-start self-center" src="/icons/heart-pink.svg" @click="addFavourite()"/>
                <PlayButtonComponent :text="''" :classes="'h-16'" :to="deriveLink()"></PlayButtonComponent>
            </div>
        </div>
        <video id="header-video" class="absolute top-0 left-0 w-full" :src="deriveWatchURL()" :poster="deriveThumbnailURL()" muted></video>
    </div>
</template>

<style scoped>
</style>

