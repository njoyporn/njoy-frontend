<script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps<{
        items: string[];
        label: string;
    }>()

    const showList = ref<boolean>(false);
    const selection = ref<string[]>([]);

    const emit = defineEmits<{
        (e: "update:selection", selection: string[]): void
    }>()

    watch(()=>selection.value.length, ()=> {
        emit("update:selection", selection.value);
    })

    function onShowList(): void {
        showList.value = !showList.value;
    }

    function onSelect(item: string): void {
        if(!isSelected(item)) selection.value.push(item);
        else selection.value = selection.value.filter(selected => selected != item);
    }

    function isSelected(item: string): boolean {
        return selection.value.includes(item);
    }

    function selectAll(): void {
        if (props.items.length == selection.value.length) selection.value = [];
        else selection.value = props.items;
    }
</script>

<template>
    <div class="z-10 w-64 text-white">
        <button class="w-full h-16 border bg-gray-600" v-text="label" @click="onShowList"></button>
        <div class="w-full [&>*:nth-child(odd)]:bg-gray-500 [&>*:nth-child(even)]:bg-gray-600" v-if="showList">
            <div class="text-center py-2 px-4" @click="selectAll">Select all</div>
            <div class="py-2 px-4" v-for="(item, i) of items" :key="i">
                <div class="w-full grid grid-cols-[2.5rem_1fr] gap-2" @click="onSelect(item)">
                    <input class="w-6" type="checkbox" readonly :checked="isSelected(item)"/>
                    <span class="text-3xl" v-text="item"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>