<script setup lang="ts">
    import { VideoAPI } from '@/api/video/video.api';
    import type { Video } from '@/types/video.type';
    import { ref, onMounted, watch } from 'vue';
    import PlayButtonComponent from '../buttons/PlayButtonComponent.vue';
    import { FavouriteManager } from '@/services/favourite.service';


    const props = defineProps<{
        video?: Video;
        reload?: boolean;
    }>()

    const emit = defineEmits<{
        (e: "update:isLoading", isLoading: boolean): void
        (e: 'addFavourite'): void;
    }>()

    const isLoading = ref<boolean>(true);
    const video = ref<Video | null>();

    onMounted(async ()=>{
        if(props.video) video.value = props.video;
        else {
            await loadRandomVideo()
        }
        isLoading.value = false;
        emit("update:isLoading", isLoading.value);
    })

    watch(() => props.reload, async () => {
        await loadRandomVideo();
    })

    async function loadRandomVideo(): Promise<void> {
        const res: Video[] | null = await VideoAPI.getRandomVideos()
        if(!res) return;
        video.value = res[0];
    }

    function deriveWatchURL(): string {
        if(!video.value) return '';
        // return `http://localhost:6692/api/v1/watch?id=${props.video.id}`
        return `https://api.njoyporn.com/api/v1/watch?id=${video.value.id}`
    }

    function deriveThumbnailURL(): string {
        if(!video.value) return '';
        // return `http://localhost:6692/api/v1/image?id=${props.video.id}&iid=0`
        return `https://api.njoyporn.com/api/v1/image?id=${video.value.id}&iid=0`
    }

    function playVideo(): void {
        const element: HTMLVideoElement | null = document.getElementById("romance-video") as HTMLVideoElement;
        if(!element) return;
        element.play();
    }
    function pauseVideo(): void {
        const element: HTMLVideoElement | null = document.getElementById("romance-video") as HTMLVideoElement;
        if(!element) return;
        element.pause();
    }
    function deriveLink(): string {
        if(!video.value) return "/";
        return `/watch/${video.value.id}`;
    }

    function addFavourite(): void {
        if(!video.value) return;
        alert
        FavouriteManager.addFavourite(video.value);
        emit('addFavourite');
    }
</script>

<template>
    <div class="w-full lg:h-3/5 bg-red bg-pg-dark-100 flex justify-center flex-wrap" @mouseleave="pauseVideo()">
        <h2 class="lg:text-8xl text-4xl font-bold lg:pl-24 p-8 w-full text-center">Romance of the Day</h2>
        <div class="h-3/4 w-full flex flex-wrap lg:pl-32 p-4 justify-center">
            <video id="romance-video" class="w-auto lg:max-h-1/2 lg:h-full h-1/2 border-2 rounded-lg" :src="deriveWatchURL()" :poster="deriveThumbnailURL()" @mouseenter="playVideo()" muted></video>
            <div v-if="video" class="lg:w-1/3 h-full pl-8 grid grid-rows-[1fr_2fr_1fr_1fr_1fr_2fr] gap-2">
                <h2 class="lg:text-5xl text-4xl w-full overflow-x-auto font-bold capitalize" v-text="video.title"></h2>
                <p class="lg:w-[66%] w-full text-4xl h-full font-semibold capitalize overflow-y-auto" v-text="video.description"></p>
                <div class="w-full flex flex-wrap gap-2">
                    <div class="h-12 border rounded-md px-4 py-1 w-fit text-3xl font-semibold bg-fuchsia-400 bg-opacity-95 capitalize" v-for="(category, i) of video.categories" :key="i" v-text="category"></div>
                </div>
                <div class="w-full flex flex-wrap gap-2">
                    <div class="h-12 border rounded-md px-4 py-1 w-fit text-3xl font-semibold bg-gray-600 bg-opacity-95 capitalize" v-for="(sub_category, i) of video.sub_categories" :key="i" v-text="sub_category"></div>
                </div>
                <div class="w-full flex flex-wrap gap-2">
                    <div class="h-12 border rounded-md px-4 py-1 w-fit text-3xl font-semibold bg-orange-400 bg-opacity-95 capitalize" v-for="(happy_end, i) of video.happy_ends" :key="i" v-text="happy_end"></div>
                </div>
                <div class="w-full h-full grid lg:grid-cols-[20rem_auto] grid-cols-[2fr_1fr] items-center gap-4">
                    <PlayButtonComponent :text="''" :to="deriveLink()"></PlayButtonComponent>
                    <img class="animate-bounce z-20" src="/icons/heart-pink.svg" @click="addFavourite()"/>
                </div>
            </div>
        </div>
    </div>    
</template>

<style scoped>
</style>