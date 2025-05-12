<script setup lang="ts">
    import { ref } from 'vue';
import { resolveIconSrc } from '../utils/images.utils';

    const props = defineProps<{
        title:string;
        items:string[];
        singleSelect?:boolean;
    }>();

    const showItems = ref<boolean>(false);
    const selectedItems = ref<string[]>([]);

    const emit = defineEmits<{
        (e: "on-update", selectedItems:string[]): void;
        (e: "single-select", selectedItem:string): void;
    }>();

    function updateItemsList(item: string): void {
        if(!isSelected(item)){
            if(props.singleSelect){
                selectedItems.value = [item]
                emit("single-select", item);
            } else {
                selectedItems.value.push(item);
            }
        } else {
            selectedItems.value = selectedItems.value.filter(i => i != item)
        }
        emit("on-update", selectedItems.value);
    }

    function isSelected(item: string): boolean{
        return selectedItems.value.includes(item);
    }
</script>

<template>
    <div class="align-top min-h-64 w-64 cursor-pointer" :class="{'shadow-xl': showItems}">
        <button class="w-full flex items-center h-16 text-4xl font-bold bg-gray-700 shadow-xl" :class="{'rounded-t-xl': showItems, 'rounded-xl':!showItems}" 
            @click="showItems = !showItems">
            <label class="w-10/12 cursor-pointer">{{ title }}</label>
            <img class="w-2/12 h-6" :class="{'rotate-180': !showItems}" :src="resolveIconSrc('u_arrow.svg')">
        </button>
        <div class="w-full flex flex-wrap rounded-b-lg max-h-96 overflow-y-auto" v-if="showItems">
            <div class="w-full text-4xl p-2 hover:bg-sky-700" v-for="(item, i) of items" :key="i" 
                @click="updateItemsList(item)" 
                :class="{'bg-sky-800': isSelected(item), 'bg-gray-500':i%2==0, 'bg-gray-700':i%2!=0}">
                {{ item }}
            </div>
        </div>
        <div class="w-full flex flex-wrap rounded-lg max-h-96 overflow-y-auto mt-4" v-if="selectedItems.length > 0 && !showItems">
            <div class="w-full text-4xl p-2 hover:bg-red-900 hover:line-through" v-for="(item, i) of selectedItems" :key="i" 
                @click="updateItemsList(item)" 
                :class="{'bg-red-200': isSelected(item), 'bg-gray-500':i%2==0, 'bg-gray-700':i%2!=0}">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<style>

</style>