<script setup lang="ts">
    import AnimatedSearchBar from '../shared/searchbar/AnimatedSearchBar.vue';
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import { categoryList, sub_categoryList, happyEndList } from '@/types/porn.types';
    import type { Links, Paginated } from '@/types/core.types';
    import type { Video } from '@/types/video.type';
    import { VideoAPI } from '@/api/video/video.api';
    import PageComponent from '../shared/video/PageComponent.vue';

    const route = useRoute();
    const isLoading = ref<boolean>(true);
    const searchTerm = ref<string>("");
    let lastFilterRecord: Record<string, string>[] = []; 
    const searchResult = ref<Video[]>([]);
    const lastSearchTerm = ref<string>("");
    const links = ref<Links>({prev:"", next:""});
    const showSearchBar = ref<boolean>(false)

    onMounted(async ()=>{
        const searchParam: string = route.params.search.toString();
        if(searchParam != ""){
            searchTerm.value = capitalizeFirstLetter(searchParam);
            lastSearchTerm.value = searchTerm.value;
            showSearchBar.value = true;
            await searchVideos();
        }
        isLoading.value = false;
    })
    async function searchVideos(): Promise<void> {
 
        const searchList = searchTerm.value.split(" ");
        const categories: string[] = [];
        const sub_categories: string[] = [];
        const happy_ends: string[] = [];
        
        searchList.forEach((word) => {
            categoryList.forEach((category) => {
                if (category.toLowerCase().includes(word.toLocaleLowerCase())) categories.push(word);
            });
            sub_categoryList.forEach((category) => {
                if (category.toLowerCase().includes(word.toLocaleLowerCase())) sub_categories.push(word);
            });
            happyEndList.forEach((happy_end) => {
                if (happy_end.toLocaleLowerCase().includes(word.toLocaleLowerCase())) happy_ends.push(word)
            });
        });
        const filterRecord: Record<string, string>[] = []
        if (categories.length > 0) filterRecord.push({categories:categories.join(",")});
        if (sub_categories.length > 0) filterRecord.push({sub_categories:sub_categories.join(",")});
        if (happy_ends.length > 0) filterRecord.push({happy_ends:happy_ends.join(",")});
        lastFilterRecord = filterRecord;
        const res: Paginated<Video> | null = await VideoAPI.searchVideos(filterRecord);
        if(!res) return;
        
        if(res.links.next != "" || res.links.prev != "") links.value = res.links
        if (res.business_response.message == "!Search: Random-Videos"){
            lastSearchTerm.value = `No videos found for ${searchTerm.value}`;
            searchResult.value = res.business_response.items;
        } else {
            lastSearchTerm.value = searchTerm.value;
            searchResult.value = res.business_response.items;
        }
    }
    async function loadPrev(): Promise<void> {
        const res: Paginated<Video> | null = await VideoAPI.searchVideos(lastFilterRecord, [], links.value.prev);
        if(!res) return;
        if(res.links.next != "" || res.links.prev != "") links.value = res.links
        lastSearchTerm.value = searchTerm.value;
        searchResult.value = res.business_response.items;
    }
    async function loadNext(): Promise<void> {
        const res: Paginated<Video> | null = await VideoAPI.searchVideos(lastFilterRecord, [], links.value.next);
        if(!res) return;
        if(res.links.next != "" || res.links.prev != "") links.value = res.links
        lastSearchTerm.value = searchTerm.value;
        searchResult.value = res.business_response.items;
    }

    function capitalizeFirstLetter(word: string): string {
        return String(word).charAt(0).toUpperCase() + String(word).slice(1);
    }
</script>

<template>
    <div class="w-full h-full">
        <div class="pt-20 w-full h-1/6 z-30">
            <AnimatedSearchBar v-if="showSearchBar" v-model:input="searchTerm" :hideOptions="true" @confirm="searchVideos()" :inputClasses="'opacity-50 focus:opacity-100'" :enabled="!isLoading" :animationText="{text: searchTerm ? searchTerm : 'Best Porn Available Online', delay: 450, cps: 14, out: 750}"/>
        </div>
        <div class="w-full h-5/6">
            <PageComponent :videos="searchResult" :title-text="lastSearchTerm" :links="links" @loadPrev="loadPrev()" @loadNext="loadNext()"></PageComponent>
        </div>
    </div>
</template>

<style scoped>
</style>