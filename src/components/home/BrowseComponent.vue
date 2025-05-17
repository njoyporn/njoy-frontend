<script setup lang="ts">
    import VideoHeaderComponent from '../shared/video/VideoHeaderComponent.vue';
    import ListComponent from '../shared/video/ListComponent.vue';
    import AnimatedSearchBar from '../shared/searchbar/AnimatedSearchBar.vue';
    import { ref, watch, onMounted } from 'vue';
    import { VideoAPI } from '@/api/video/video.api';
    import { hot_categories, hot_sub_categories, hot_happy_ends, categoryList, sub_categoryList, happyEndList } from '@/types/porn.types';
    import type { Video } from '@/types/video.type';
    import PageComponent from '../shared/video/PageComponent.vue';
    import type { Links, Paginated } from '@/types/core.types';
    import { pickRandom } from '../shared/utils/list.utils';
    import SingleVideoRowComponent from '../shared/video/SingleVideoRowComponent.vue';
    import LegalComponent from '../shared/legal/LegalComponent.vue';
    import ArtisticLoadingScreen from '../shared/loading/ArtisticLoadingScreen.vue';
    import { RTAService } from '@/services/rta.service';
    import StarfieldComponent from '../shared/starfield/StarfieldComponent.vue';


    let lastFilterRecord: Record<string, string>[] = []; 

    const isLoading = ref<boolean>(true)
    const searchTerm = ref<string>("");
    const searchResult = ref<Video[]>([]);
    const lastSearchTerm = ref<string>("");
    const links = ref<Links>({prev:"", next:""});

    const randomCategory = ref<string>(pickRandom<string>(hot_categories));
    const randomSubCategory = ref<string>(pickRandom<string>(hot_sub_categories));
    const randomHappyEnd = ref<string>(pickRandom<string>(hot_happy_ends));
    const loadingList = ref<boolean[]>([true, true, true, true, true, true, true, true]); //the last one needs to be reserved for rta

    const reloadFavourites = ref<boolean>(false);
    const reloadRandomCategories = ref<boolean>(false);
    const reloadRandomBitches = ref<boolean>(false);
    const reloadHappyEnds = ref<boolean>(false);
    const reloadRomanceOfTheDay = ref<boolean>(false);
    const reachedBottom = ref<boolean>(false);
    const reachedTop = ref<boolean>(true)

    onMounted(()=>{
        document.addEventListener("scroll", ()=>{
            if(window.scrollY + window.innerHeight == document.body.scrollHeight){
                if(reachedTop.value){
                    randomCategory.value = pickRandom<string>(hot_categories);
                    reloadRomanceOfTheDay.value = !reloadRomanceOfTheDay.value;
                    reloadRandomCategories.value = !reloadRandomCategories.value;
                    reachedTop.value = false;
                    reachedBottom.value = true;
                }
            }
            if(window.scrollY <= 625) {
                if(reachedBottom.value){
                    randomHappyEnd.value = pickRandom<string>(hot_happy_ends);
                    randomSubCategory.value = pickRandom<string>(hot_sub_categories);
                    reloadHappyEnds.value = !reloadHappyEnds.value;
                    reloadRandomBitches.value = !reloadRandomBitches.value;
                    reachedTop.value = true;
                    reachedBottom.value = false;
                }
            }
        });
        loadingList.value[loadingList.value.length - 1] = !RTAService.load()
    })

    watch(()=>loadingList.value, ()=>{
        if(loadingList.value.find((item)=>item == true)) return;
        isLoading.value = false;
        
    }, {deep:true})

    async function searchVideos(): Promise<void> {
        // isLoading.value = true;
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
        lastSearchTerm.value = searchTerm.value;
        searchResult.value = res.business_response.items;
        // isLoading.value = false;
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

    function calcLoadingProgress(): number {
        let doneCounter: number = 0;
        loadingList.value.forEach((item) => { if(item == true) {
            doneCounter++;
        }})
        return Math.floor(100 - (doneCounter / loadingList.value.length) * 100);
    }

    function acceptRTA(): void {
        loadingList.value[loadingList.value.length - 1] = false;
        RTAService.save();
    }
</script>

<template>
    <div class="h-full w-full" :class="{'overflow-y-clip': isLoading}">
        <ArtisticLoadingScreen v-if="isLoading" :progress="calcLoadingProgress()" @acceptRTA="acceptRTA()" :useRTA="loadingList[loadingList.length - 1]"/>
        <Transition name="fade">
        <div class="w-full h-full">
            <div class="absolute lg:top-40 top-5 w-full z-30">
                <AnimatedSearchBar v-model:input="searchTerm" :hideOptions="true" @confirm="searchVideos()" :inputClasses="'opacity-50 focus:opacity-100'" :enabled="!isLoading" :animationText="{text: 'Best Porn Available Online', delay: 450, cps: 14, out: 750}"/>
            </div>
            <VideoHeaderComponent v-model:isLoading="loadingList[0]" @addFavourite="reloadFavourites = !reloadFavourites"/>
            <div class="w-full h-full" v-if="searchResult.length == 0">
                <ListComponent :title="'Favourites'" :state="'FAVOURITES'" :reload="reloadFavourites" :titleClasses="'bg-transparent'" v-model:isLoading="loadingList[1]" :listClasses="'bg-pg-zero-to-dark-0-100'" @addFavourite="reloadFavourites = !reloadFavourites" :deletable="true"></ListComponent>
                <ListComponent :title="`Random Category: ${randomCategory}`" :reload="reloadRandomCategories" :state="'CATEGORY'" :category="randomCategory" :titleClasses="'bg-pg-dark-100'" v-model:isLoading="loadingList[2]" :listClasses="'bg-pg-dark-100'" @addFavourite="reloadFavourites = !reloadFavourites"></ListComponent>
                <SingleVideoRowComponent v-model:isLoading="loadingList[3]" :reload="reloadRomanceOfTheDay" @addFavourite="reloadFavourites = !reloadFavourites"/>
                <ListComponent :title="`Random ${randomSubCategory} Bitches`" :reload="reloadRandomBitches" :state="'SUB_CATEGORY'" :sub_category="randomSubCategory" :titleClasses="'bg-pg-dark-100'" v-model:isLoading="loadingList[4]" :listClasses="'bg-pg-dark-100'" @addFavourite="reloadFavourites = !reloadFavourites"/>
                <ListComponent :title="`Happy End: ${randomHappyEnd}`" :reload="reloadHappyEnds" :state="'HAPPY_END'" :happy_end="randomHappyEnd" :titleClasses="'bg-pg-dark-100'" v-model:isLoading="loadingList[5]" :listClasses="'bg-pg-dark-100'" @addFavourite="reloadFavourites = !reloadFavourites"/>
                <ListComponent :title="'Most Recent'" :state="'RECENT'" :titleClasses="'bg-pg-dark-to-black-100'" v-model:isLoading="loadingList[6]" :listClasses="'pg-bg-black-100'" @addFavourite="reloadFavourites = !reloadFavourites" />
            </div>
            <PageComponent v-else :videos="searchResult" :title-text="lastSearchTerm" :links="links" @loadPrev="loadPrev()" @loadNext="loadNext()"></PageComponent>
        </div>
        </Transition>
        <LegalComponent />
        <StarfieldComponent :class="'opacity-50'"/>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>