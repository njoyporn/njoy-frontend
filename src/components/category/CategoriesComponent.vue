<script setup lang="ts">
    import { CategoryAPI } from '@/api/category/category.api';
    import CategoryCardComponent from '@/components/shared/cards/CategoryCardComponent.vue';
    import type { Category } from '@/types/category.type';
    import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const isLoading = ref<boolean>(true)
    const categorys = ref<Category[]>([])

   onMounted(async ()=>{
    const res: Category[] | null = await CategoryAPI.getCategories();
    if(!res) return
    categorys.value = res;
    categorys.value.sort((a,b) => a.name.localeCompare(b.name))
    isLoading.value = false;
   })

   function searchCategory(category: Category): void {
        router.push({name:"ParamSearchComponent", params: {search: category.name}})
   }
</script>

<template>
    <div class="w-full h-full">
        <h1 class="text-6xl h-1/6 font-bold w-full flex justify-center items-center pt-16 p-8">Categories</h1>
        <div class="w-full h-5/6 flex flex-wrap gap-8 pt-8 justify-center overflow-y-auto">
            <CategoryCardComponent v-for="(category, i) of categorys" :key="i" :card="category" @click=searchCategory(category)></CategoryCardComponent>
        </div>
    </div>
</template>

<style scoped></style>