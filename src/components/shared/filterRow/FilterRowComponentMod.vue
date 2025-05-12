<script setup lang="ts">
    import FilterComponentMod from './FilterComponentMod.vue';
    import type { SelectionEntity } from './fixtures';


    const props = defineProps<{
        selections: SelectionEntity[]
    }>();
</script>

<template>
    <div class="w-full h-48 bg-sky-200 p-8">
        <div class="flex max-h-16">
            <FilterComponentMod v-for="(selectionEntity, i) of selections" :key="i" :label="selectionEntity.label" :items="selectionEntity.items" v-model:selection="selectionEntity.items"></FilterComponentMod>
        </div>
        <div class="h-20 top-20 flex">
            <div class="flex gap-2" v-for="(selectionEntity, i) of selections" :key="i">
                <div class="flex" v-for="(item, i) of selectionEntity.items" :key="i">
                    <div class="" v-if="item.selected" v-text="item.name"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>