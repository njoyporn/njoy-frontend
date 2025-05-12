<script setup lang="ts">
    import { ref } from "vue";
    import { resolveIconSrc } from "../utils/images.utils";

    const props = defineProps<{
        classes?: string;
    }>()

    const searchTerm = ref<string>("");

</script>

<template>
    <div class="max-w-96 flex h-full px-2 py-1" :class="classes">
        <input class="w-5/6 h-full rounded-l-md px-2 text-white bg-gray-600" v-model="searchTerm">
        <button class="lg:w-1/6
                       w-16 flex justify-center items-center p-2 h-full rounded-r-md bg-gray-700 text-white"><img class="p-1 h-full w-auto" :src="resolveIconSrc('magnification_class.svg')" /></button>
    </div>
</template>

<style scoped>

</style>