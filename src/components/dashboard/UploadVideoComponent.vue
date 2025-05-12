<script setup lang="ts">
    import { ref } from "vue";
    import FileInput from '../shared/forms/FileInput.vue';LabeledTextArea
    import LabeledTextInput from '../shared/forms/LabeledTextInput.vue';
    import LabeledTextArea from '../shared/forms/LabeledTextAreaInput.vue';
    import LabeledCheckbox from "../shared/forms/LabeledCheckbox.vue"
    import { VideoAPI } from "@/api/video/video.api";
    import { VideoService } from "@/services/video.service";
    import type { CreateVideoRequestDTO } from "@/types/video.type";
    import MultiSelectionComponent from "../shared/dropdown/MultiSelectionComponent.vue";
    import { categoryList, sub_categoryList, happyEndList, visibilityOptionList } from "@/types/porn.types";
    import type { BusinessResponse } from "@/types/core.types";

    const videoDTO = ref<CreateVideoRequestDTO>(VideoService.emptyCreateVideRequestDTO())
    const isUploading = ref<boolean>(false);

    async function upload(){
        isUploading.value = true;
        if(videoDTO.value.file){
            const res: BusinessResponse<any> = await VideoAPI.upload(videoDTO.value);
            if(res.message == "VIDEO_CREATED") {
                isUploading.value = false;
            }
            else {
                alert("ERROR"); 
                isUploading.value = false;
            }
            return;
        }
    }
</script>

<template>
    <div class="w-full h-full p-4">
        <h2 class="text-6xl font-bold w-full text-center h-1by12">Video Upload (Uploading: {{ isUploading }})</h2>
        <div class="grid grid-rows-[1fr_1fr_4fr] items-center p-8 h-11by12">
            <div class="grid grid-cols-[1fr_1fr]">
                <FileInput @file-change="videoDTO.file = $event" :btnText="'Select Video'"></FileInput>
                <div class="w-full flex justify-center items-center">
                    <button class="h-16 w-1/3 px-4 border-2 bg-orange-400 font-bold text-4xl rounded-lg" @click="upload()">UPLOAD</button>
                </div>
            </div>
            <div class="grid grid-cols-[1fr_1fr] h-full">
                <LabeledTextInput v-model:input="videoDTO.title" :label="'Video Title'" :placeholder="videoDTO.title"></LabeledTextInput>
                <div class="grid grid-cols-[1fr_1fr_1fr] p-4 pt-16 h-full items-center">
                    <LabeledCheckbox :label="'Public'" v-model:input="videoDTO.public"></LabeledCheckbox>
                    <LabeledCheckbox :label="'Free'" v-model:input="videoDTO.free"></LabeledCheckbox>
                    <LabeledCheckbox :label="'Trailer'" v-model:input="videoDTO.trailer"></LabeledCheckbox>
                </div>
            </div>
            <div class="grid grid-cols-[1fr_1fr] gap-8 h-full">
                <div class="grid grid-rows-[10fr_6fr]">
                    <LabeledTextArea v-model:input="videoDTO.description" :label="'Video Description'" :placeholder="videoDTO.description" :style="'height: 80%;'"></LabeledTextArea>
                    <LabeledTextInput v-model:input="videoDTO.timestamps" :label="'Time-Stamps'" :placeholder="videoDTO.timestamps"></LabeledTextInput>
                </div>
                <div class="grid grid-rows-[1fr_1fr_1fr_1fr_1fr] h-full">
                    <MultiSelectionComponent v-model:selection="videoDTO.categories" :list="categoryList" :inputPlaceholder="'Enter or select Categorys'"></MultiSelectionComponent>
                    <MultiSelectionComponent v-model:selection="videoDTO.sub_categories" :list="sub_categoryList" :inputPlaceholder="'Enter Sub-Categorys'"></MultiSelectionComponent>
                    <MultiSelectionComponent v-model:selection="videoDTO.tags" :list="[]" :inputPlaceholder="'Enter Tags'"></MultiSelectionComponent>
                    <MultiSelectionComponent v-model:selection="videoDTO.happy_ends" :list="happyEndList" :inputPlaceholder="'Enter or select Happy-End(s)'"></MultiSelectionComponent>
                    <MultiSelectionComponent v-model:selection="videoDTO.visibility" :list="visibilityOptionList" :inputPlaceholder="'Enter Visibility Options'"></MultiSelectionComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>