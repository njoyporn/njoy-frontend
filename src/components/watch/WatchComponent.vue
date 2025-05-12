<script setup lang="ts">
    import { ref, onMounted, watch } from "vue";
    import type { Video } from "@/types/video.type";
    import { useRoute } from "vue-router";
    import { VideoAPI } from "@/api/video/video.api";
    import VideoPlayer from "@/components/shared/video/VideoPlayer.vue";
    import ListComponent from "../shared/video/ListComponent.vue";
    import { durationToTimeString } from "../shared/utils/duration.utils";
    import { FavouriteManager } from "@/services/favourite.service";
    import StarfieldComponent from "../shared/starfield/StarfieldComponent.vue";

    const route = useRoute();
    const isLoading = ref<boolean>(true);
    const video = ref<Video|null>(null);

    const canLike = ref<boolean>(true);
    const canDislike = ref<boolean>(true);
    const isFavourite = ref<boolean>(false);
    const isFullScreen = ref<boolean>(false);
    const showStarfieldAnyway = ref<boolean>(false);

    onMounted(async () => {
        const id: string|null = route.params.id.toString();
        if(!id) return;
        const res: Video | null = await VideoAPI.getVideo(id);
        if(!res) return;
        video.value = res;
        isLoading.value = false;
        isFavourite.value = !!FavouriteManager.favourites.find((favourite) => favourite.id == id);
    })

    watch(()=>route.params.id, async () => {
        const id: string|null = route.params.id.toString();
        if(!id) return;
        const res: Video | null = await VideoAPI.getVideo(id);
        if(!res) return;
        video.value = res;
        isFavourite.value = !!FavouriteManager.favourites.find((favourite) => favourite.id == id);
    })

    async function likeVideo(): Promise<void> {
        if(!video.value || !canLike.value) return;
        video.value.likes++;
        await VideoAPI.likeVideo(video.value.id);
    }
    async function dislikeVideo(): Promise<void> {
        if(!video.value || !canDislike.value) return;
        video.value.likes++;
        await VideoAPI.dislikeVideo(video.value.id);
    }
    async function addFavourite(): Promise<void> {
        if(!video.value) return;
        FavouriteManager.addFavourite(video.value);
        isFavourite.value = true;
    }

    function enableFullscreen(): void {
        isFullScreen.value = true;
    }
    function disableFullscreen(): void {
        isFullScreen.value = false;
    }
</script>

<template>
    <div v-if="video" class="w-full h-screen grid grid-rows-[1fr_8fr_2fr] pulse">
        <div class="w-full h-full">

        </div>
        <div class="w-full h-full grid grid-cols-[2fr_6fr_2fr_]">
            <div class="w-full h-full"></div>
            <div class="w-full h-full z-20">
                <VideoPlayer v-if="video" :video="video" @watched="VideoAPI.increaseVideoWatchCounter(video.id)" @switchStarfieldOnOFF="showStarfieldAnyway = !showStarfieldAnyway" @fullscreenDisabled="disableFullscreen()" @fullscreenEnabled="enableFullscreen()"></VideoPlayer>
            </div>
            <div class="w-full h-full"></div>
        </div>
        <div class="w-full h-full grid grid-cols-[2fr_6fr_2fr_]">
            <div class="w-full h-full"></div>
            <div class="w-full h-full p-4">
                <h2 class="font-bold lg:text-6xl text-3xl mb-4" v-text="video.title"></h2>
                <div class="w-full grid lg:grid-cols-[1fr_1fr_1fr_1fr_8fr_1fr] grid-cols-[1fr_1fr_1fr_1fr_2fr_1fr]">

                    <div class="flex items-center" :class="{'animate-bounce': isFavourite}"><img class="w-12 h-12" :class="{'animate-pulse': isFavourite}" src="/icons/heart-pink.svg" @click="addFavourite()"/></div>

                    <div class="flex items-center"><img class="w-12 h-12" :class="{'grayscale': !canLike}" src="/icons/thumbs-up-yellow.svg" @click="likeVideo()"/><span class="pl-4 font-bold lg:text-4xl text-2xl" v-text="video.likes"></span></div>

                    <div class="flex items-center"><img class="w-12 h-12" src="/icons/thumbs-down-yellow.svg" @click="dislikeVideo()"/><span class="pl-4 font-bold lg:text-4xl text-2xl" v-text="video.dislikes"></span></div>

                    <div class="flex items-center"><img class="w-12 h-12" :class="{'grayscale': !canDislike}" src="/icons/eye-colored.svg" /><span class="pl-4 font-bold lg:text-4xl text-2xl" v-text="video.views"></span></div>

                    <div></div>

                    <div class="w-full h-full flex items-center justify-end pr-8"><img class="w-12 h-12" src="/icons/duration.svg" /><span class="pl-4 font-bold text-4xl" v-text="durationToTimeString(video.duration)"></span></div>
                </div>
            </div>
            <div class="w-full h-full"></div>
        </div>
    </div>
    <div class="w-full">
        <ListComponent :title="'Random Videos'" :state="'RANDOM'" :titleClasses="'bg-pg-dark-100'" :listClasses="'bg-pg-dark-100'"></ListComponent>
    </div>
    <StarfieldComponent v-if="!isFullScreen || showStarfieldAnyway" :wrapperClasses="'opacity-25'"/>
</template>

<style scoped>
.pulse {
  animation: animateBg 10s linear infinite;
}
@keyframes animateBg {
    0% {
        backdrop-filter: hue-rotate(0deg);
    }
    100% {
        backdrop-filter: hue-rotate(360deg);
    }
}
</style>