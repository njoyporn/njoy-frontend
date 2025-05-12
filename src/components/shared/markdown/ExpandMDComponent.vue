<script setup lang="ts">
    import { resolveIconSrc } from "@/components/shared/utils/images.utils";
    import { ref, onMounted } from "vue";

    const props = defineProps<{
        spanText: string;
        wrapperClasses?: string;
    }>()

    onMounted(()=>{
        if(props.wrapperClasses){
           localWrapperClasses.value = props.wrapperClasses; 
        }
    })

    const show = ref<boolean>(false);
    const localWrapperClasses = ref<string>("border border-white border-opacity-15 rounded-l-md")

</script>

<template>
<div class="w-full grid grid-rows-[3rem_auto]" :class="show ? localWrapperClasses : ''">
    <div class="w-full flex cursor-pointer" @click="show=!show">
        <img class="p-2" :class="{'rotate-[180deg]':show}" :src="resolveIconSrc('animated/downArrow.svg')">
        <span class="flex items-center pl-4" v-text="spanText"></span>
    </div>
    <br v-if="show" />
    <div :class="{'p-8':show}">
        <slot v-if="show" name="hidden-component"></slot>
    </div>
</div>

</template>

<style scoped>

</style>