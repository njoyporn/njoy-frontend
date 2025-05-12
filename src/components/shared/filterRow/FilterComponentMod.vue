<script setup lang="ts">
    import { ref } from "vue";
    import type { SelectionItem } from "./fixtures";

    const props = defineProps<{
        items: SelectionItem[];
        label: string;
    }>()

    const showList = ref<boolean>(false);
</script>

<template>
    <div class="z-10 w-64 text-white">
        <button class="w-full h-16 border bg-gray-600" v-text="label" @click="showList = !showList"></button>
        <div class="w-full [&>*:nth-child(odd)]:bg-gray-500 [&>*:nth-child(even)]:bg-gray-600" v-if="showList">
            <div class="py-2 px-4" v-for="(item, i) of items" :key="i">
                <div class="w-full grid grid-cols-[2.5rem_1fr] gap-2" @click="item.selected = !item.selected">
                    <input class="w-6" type="checkbox" readonly :checked="item.selected"/>
                    <span class="text-3xl" v-text="item.name"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>