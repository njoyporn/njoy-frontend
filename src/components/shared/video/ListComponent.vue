<script setup lang="ts">
    import { ref, onMounted, watch } from "vue";
    import type { Video } from '@/types/video.type';
    import VideoList from "./VideoList.vue";
    import { VideoAPI } from "@/api/video/video.api";
    import type { LIST_STATE } from "./types";
    import type { Paginated } from "@/types/core.types";
    import SimpleLoading from "../loading/SimpleLoading.vue";
    import { FavouriteManager } from "@/services/favourite.service";

    const props = defineProps<{
        title: string;
        state: LIST_STATE;
        list?: Video[];
        wrapperClasses?:string;
        titleClasses?: string;
        listClasses?: string;
        category?: string;
        sub_category?: string;
        happy_end?: string;
        isLoading?: boolean;
        reload?:boolean;
        deletable?:boolean;
    }>()

    const emit = defineEmits<{
        (e: "update:isLoading", isLoading: boolean): void;
        (e: "addFavourite", favourite: Video): void;
        (e: "delFavourite", id: string): void;
    }>()

    const isLoading = ref<boolean>(true)
    const videoList = ref<Video[]>([]);
    const title = ref<string>("")

    onMounted(async () => {
        title.value = props.title;
        if(!props.isLoading) isLoading.value = props.isLoading;
        if(props.list && props.list.length > 0) {
            videoList.value = props.list
        }
        if (!props.list || props.list.length == 0) {
            await laodVideos();
        }
        isLoading.value = false;
    })

    watch(()=>isLoading.value, ()=>{
        emit("update:isLoading", isLoading.value);
    })

    watch(()=>props.reload, async ()=>{
        await laodVideos();
    })

    watch(()=>props.title, ()=>{
        title.value = props.title;
    })

    async function loadFavourites(): Promise<void> {
        const favourites: Video[] = FavouriteManager.getFavaourites();
        if (favourites.length > 0) {
            videoList.value = favourites;
        } else {
            title.value = "Click on the Heart to Select Favourites <img class='w-auto h-16 pl-4 flex justify-center items-center animate-bounce' src='/icons/heart-pink.svg' />"
            loadRandomVideos();
        }
    }
    async function loadRandomVideos(): Promise<void> {
        
        const res: Video[] | null = await VideoAPI.getRandomVideos();
        if (!res) return;
        videoList.value = res;
    }
    async function loadCategories(): Promise<void> {
        if(!props.category) return;
        const res: Paginated<Video> | null = await VideoAPI.searchVideos([{"categories":props.category}], [], "&page=-1");
        if (!res) return;
        videoList.value = res.business_response.items;
    }
    async function loadSubCategories(): Promise<void> {
        if(!props.sub_category) return;
        const res: Paginated<Video> | null = await VideoAPI.searchVideos([{"sub_categories":props.sub_category}], [], "&page=-1");
        if (!res) return;
        videoList.value = res.business_response.items;
    }
    async function loadHappyEnds(): Promise<void> {
        if(!props.happy_end) return;
        const res: Paginated<Video> | null = await VideoAPI.searchVideos([{"happy_ends":props.happy_end}], [], "&page=-1");
        if (!res) return;
        videoList.value = res.business_response.items;
    }

    async function laodVideos(): Promise<void> {
        switch(props.state){
            case "FAVOURITES": await loadFavourites(); return;
            case "CATEGORY": await loadCategories(); return;
            case "SUB_CATEGORY": await loadSubCategories(); return;
            case "HAPPY_END": await loadHappyEnds(); return;
            case "RANDOM":
            default: await loadRandomVideos(); return;
        }
    }

    function removeFavourite(id: string): void {
        loadFavourites()
    }

    function addFavourite(video: Video): void {
        emit('addFavourite', video);
    }

</script>

<template>
    <SimpleLoading v-if="isLoading" :wrapperClasses="`flex justify-center items-center w-full h-full ${listClasses}`"></SimpleLoading>
    <div v-else class="w-full lg:min-h-[24rem] bg-pg-dark" :class="wrapperClasses">
        <div class="h-full grid grid-cols-[2fr_1fr]">
            <h2 class="text-white lg:text-6xl lg:indent-0 -indent-4 text-4xl font-bold lg:p-4 p-2 pl-8 lg:pl-24 relative overflow-x-auto flex" :class="titleClasses" v-html="title"></h2>
            <div class="w-full relative" :class="titleClasses"><slot name="add"></slot></div>
        </div>
        <VideoList v-model:list="videoList" :classes="listClasses" @delFavourite="removeFavourite($event)" @addFavourite="addFavourite($event)" :deletable="deletable"></VideoList>
    </div>
</template>

<style scoped>
</style>