<script setup lang="ts">
    import { useTemplateRef, ref, onMounted, watch } from "vue";
    import type { Video } from '@/types/video.type';
    import { durationToTimeString } from '../utils/duration.utils';
    import { FavouriteManager } from "@/services/favourite.service";

    const props = defineProps<{
        video: Video;
        wrapperClasses?: string;
        deletable?: boolean;
    }>()

    const emit = defineEmits<{
        (e: "delFavourite", id: string): void;
        (e: "addFavourite", video: Video): void;
    }>();

    const showDetails = ref<boolean>(false);
    const videoElement = useTemplateRef<HTMLVideoElement>("video");
    const isFavourite = ref<boolean>(false)

    onMounted(()=> {
        isFavourite.value = FavouriteManager.isFavourite(props.video.id)
    })

    watch(()=>props.video, ()=>{
        isFavourite.value = FavouriteManager.isFavourite(props.video.id)
    })

    function deriveWatchURL(): string {
        // return `http://localhost:6692/api/v1/watch?id=${props.video.id}`
        return `https://api.njoyporn.com/api/v1/watch?id=${props.video.id}`
    }

    function deriveThumbnailURL(): string {
        // return `http://localhost:6692/api/v1/image?id=${props.video.id}&iid=0`
        return `https://api.njoyporn.com/api/v1/image?id=${props.video.id}&iid=0`
    }

    function playVideo(): void {
        if(!videoElement.value) return;
        videoElement.value.play();
    }
    function pauseVideo(): void {
        if(!videoElement.value) return;
        videoElement.value.pause();
    }

    function enableDetails(): void {
        showDetails.value = true;
    }

    function disableDetails(): void {
        setTimeout(()=>{
            showDetails.value = false;
        }, 1000)
    }

    async function addFavourite(): Promise<void> {
        FavouriteManager.addFavourite(props.video);
        emit("addFavourite", props.video)
    }

    function removeFavourite(): void {
        FavouriteManager.removeFavourite(props.video.id);
        emit("delFavourite", props.video.id);
    }
</script>
<template>
    <router-link :to="{name : 'WatchComponent', params: {id: video.id}}" class="min-w-[32rem] min-h-[18rem] relative hover:scale-125 z-20 hover:z-30 group" @mouseover="enableDetails()" :wrapperClasses="wrapperClasses">
        <img v-if="!isFavourite" class="absolute top-2 right-3 w-8 h-8 z-50 opacity-75 hover:scale-110 hover:animate-none" :class="{'animate-bounce': !isFavourite}" src="/icons/heart-pink.svg" @click.prevent.default="addFavourite()"/>
        <img v-if="isFavourite && deletable" class="absolute top-2 right-3 w-8 h-8 z-50 opacity-75 hover:scale-110 hover:animate-none" src="/icons/delete.svg" @click.prevent.default="removeFavourite()"/>
        <Transition name="slide-fade">
        <div v-if="showDetails" class="group-hover:scale-100 absolute top-0 left-0 grid grid-rows-[1fr_2fr_1fr_1fr_1fr] gap-2 w-full max-h-[18rem] min-h-[18rem] z-20 p-2 bg-gray-600 bg-opacity-45" @mouseleave="disableDetails()">
            <h3 class="font-bold text-3xl overflow-x-auto capitalize" v-text="video.title"></h3>
            <p @mouseover="playVideo()" @mouseleave="pauseVideo()" class="overflow-auto capitalize" v-text="video.description"></p>
            <div class="w-full h-full flex overflow-x-auto gap-2">
                <div class="px-2 border rounded-md w-fit text-nowrap h-full capitalize" v-for="(categorie, i) of video.categories" :key="i" v-text="categorie"></div>
            </div>
            <div class="w-full h-full flex overflow-x-auto gap-2">
                <div class="px-2 border rounded-md w-fit text-nowrap capitalize" v-for="(happy_end, i) of video.happy_ends" :key="i" v-text="happy_end"></div>
            </div>
            <div class="grid w-full h-full grid-cols-[2fr_2fr_2fr_3fr_2fr]">
                <div class="w-full h-full flex"><img class="w-8 h-8" src="/icons/thumbs-up-yellow.svg" />{{ video.likes }}</div>
                <div class="w-full h-full flex"><img class="w-8 h-8" src="/icons/thumbs-down-yellow.svg" />{{ video.dislikes }}</div>
                <div class="w-full h-full flex"><img class="w-8 h-8" src="/icons/eye-colored.svg" />{{ video.views }}</div>
                <div class="w-full h-full flex" v-if="video.timestamps.length > 0"><img class="w-8 h-8" src="/icons/eggplant.svg"><img class="w-8 h-8 rotate-[-36deg] pt-2 pb-2 pr-2 pl-0" src="/icons/splash-white.svg"><span>{{ video.timestamps.length }}</span></div>
                <div class="w-full h-full flex" v-else></div>
                <div class="w-full h-full flex justify-end pr-2"><img class="w-8 h-8" src="/icons/duration.svg" />{{ durationToTimeString(video.duration) }}</div>
            </div>
        </div>
        </Transition>
        
        <video ref="video" class="absolute top-0 left-0 border-2 rounded-lg" :src="deriveWatchURL()"  :poster="deriveThumbnailURL()" muted></video>
    </router-link>
</template>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from{
    transform: translateX(-20px);
    opacity: 0;
}
.slide-fade-leave-to {
  opacity: 0;
}
</style>