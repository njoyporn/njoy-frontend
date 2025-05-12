<script setup lang="ts">
    import { ref, watch} from "vue";
    import FilterComponent from './FilterComponent.vue';
    import { categories, tags } from './fixtures';


    const selectedcategories = ref<string[]>([]);
    const selectedTags = ref<string[]>([]);
    const selected = ref<string[]>([]);

    const emit = defineEmits<{
        (e: "change-selected", items: string[]): void
        (e: "change-categories", items: string[]): void
        (e: "change-tags", items: string[]): void
    }>();

    watch(()=>selectedcategories.value.length, ()=>{
        emit("change-categories", selectedcategories.value);
        selected.value = [...selectedcategories.value, ...selectedTags.value];
    });

    watch(()=>selectedTags.value.length, ()=>{
        emit("change-tags", selectedTags.value);
        selected.value = [...selectedcategories.value, ...selectedTags.value];
    });

    watch(()=>selected.value.length, ()=> {
        emit("change-selected", selected.value);
    });

</script>

<template>
    <div class="w-full h-48 bg-sky-200 p-8">
        <div class="flex max-h-16">
            <FilterComponent :label="'categories'" :items="categories" v-model:selection="selectedcategories"></FilterComponent>
            <FilterComponent :label="'categories'" :items="tags" :selected="selectedTags" v-model:selection="selectedTags"></FilterComponent>
        </div>
        <div class="h-20 top-20 flex gap-2">
            <div class="" v-for="(item, i) of selected" :key="i" v-text="item"></div>
        </div>
    </div>
</template>

<style scoped>

</style>