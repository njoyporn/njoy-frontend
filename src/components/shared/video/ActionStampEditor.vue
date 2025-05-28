<script setup lang="ts">
    import { categoryList, sub_categoryList } from "@/types/porn.types";
    import type { ActionStamp, Video } from "@/types/video.type";
    import { onMounted, ref } from "vue";
    import PrimaryButton from "../buttons/PrimaryButton.vue";
    import { ActionStampService } from "@/services/actionStamp.service";
    import MultiSelectionComponent from "../dropdown/MultiSelectionComponent.vue";

    const actionStampService: ActionStampService = ActionStampService._getInstance();
    const actionStamp = ref<ActionStamp>({ts: 0, category: [""]})
    const actionStamps = ref<ActionStamp[]>([]) 
    const showAdvanced = ref<boolean>(false);

    const props = defineProps<{
        video: Video
        currentTime?: number
    }>()

    const emit = defineEmits<{
        (e: 'action-stamp-created', actionStamp: ActionStamp): void
    }>()

    onMounted(()=>{
        actionStamp.value.videoId = props.video.id
        actionStamps.value = actionStampService.actionStamps;
    })


    function saveActionStamp(): void {
        if (actionStamp.value.ts == 0) return;
        actionStampService.saveActionStamps(actionStamp.value)
        emit('action-stamp-created', actionStamp.value);
        actionStamp.value.ts = 0;
        actionStamp.value.category = [""];
    }
    function deriveWatchURL(ts: number): string {
        // return `http://localhost:6692/api/v1/watch?id=${props.video.id}`
        return `https://api.njoyporn.com/api/v1/watch?id=${props.video.id}#t=${ts}`;
    }
    function removeActionStamp(actionStamp: ActionStamp): void {
        actionStampService.deleteActionStamp(actionStamp);
        actionStamps.value = actionStampService.actionStamps;
    }

    function setCurrentTime(): void {
        if(!props.currentTime) return;
        actionStamp.value.ts = props.currentTime;
    }
</script>

<template>
    <div class="w-full h-full flex justify-center items-center relative z-50">
        <div class="w-[54rem] h-[40rem] gap-2 bg-slate-800 bg-opacity-75 grid grid-rows-[1fr_2fr_3fr_3fr_2fr] p-4 border rounded-lg shadow-xl" :class="{'rounded-r-none' : showAdvanced}">
            <div class="grid grid-cols-[1fr_4rem] items-center"><h1>Action-Stamp Editor</h1><img v-if="!showAdvanced" class="h-9 w-auto" src="/icons/settings.svg" @click="showAdvanced = true"></div>
            <div class="w-full h-hull grid grid-cols-[8fr_2fr] gap-4">
                <input v-model="actionStamp.ts" type="number" class="h-16 w-full border-2 bg-gray-700 rounded-md">
                <button @click="setCurrentTime()" class="w-full h-3/5 border rounded-lg hover:bg-fuchsia-300">NOW</button>
            </div>
            <MultiSelectionComponent v-model:selection="actionStamp.category" :list="categoryList" :inputPlaceholder="'Enter Sub-Categorys'"></MultiSelectionComponent>
            <MultiSelectionComponent v-model:selection="actionStamp.sub_category" :list="sub_categoryList" :inputPlaceholder="'Enter Sub-Categorys'"></MultiSelectionComponent>
            <PrimaryButton :text="'Save'" :classes="'w-full'" @button-confirm="saveActionStamp()"></PrimaryButton>
        </div>
        <div v-if="showAdvanced" class="h-[40rem] w-[32rem] border rounded-r-lg bg-orange-600 bg-opacity-75 p-4 grid grid-rows-[1fr_10fr]">
            <div class="grid grid-cols-[1fr_4rem] items-center"><h1>Action-Stamp-List</h1><img v-if="showAdvanced" class="h-9 w-auto" src="/icons/settings.svg" @click="showAdvanced = false"></div>
            <div class="w-full h-full">
                <div v-for="(actionStamp, i) of actionStamps" :key="i" class="grid grid-cols-[3fr_6fr_2fr_1fr] w-full  bg-gray-600 h-20 items-center mb-2 rounded-md p-1 overflow-y-auto">
                    <video class="w-full h-auto rounded-sm" :src="deriveWatchURL(actionStamp.ts)" muted></video>
                    <p class="px-2" v-text="actionStamp.category.join(', ')"></p>
                    <p v-text="actionStamp.ts"></p>
                    <button class="border hover:border-2 hover:shadow-2xl rounded-full mb-8 w-8 h-8 bg-red-500 font-bold text-[1rem]" @click="removeActionStamp(actionStamp)">X</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>