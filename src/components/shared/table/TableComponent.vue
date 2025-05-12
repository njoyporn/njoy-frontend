<script setup lang="ts">
    const props = defineProps<{
        header:string[]
        rows:{key:string,value:string,description:string}[]
    }>();
</script>
<template>
    <div class="w-3/4 grid grid-rows-[4rem_1fr] mb-12">
        
        <div class="flex bg-gray-500 rounded-t-lg w-full items-center">
            <div class="px-4 text-left flex items-center h-full w-full font-semibold text-3xl border-b-2 border-gray-900" :class="i != 0 ? 'border-l-2 border-gray-900': ''" v-for="(item, i) of header" :key="i" v-text="item"></div>
        </div>
        
        <div class="flex flex-wrap bg-gray-800 bg-opacity-50 w-full items-center">
            <div class="flex w-full" v-for="(item, i) of rows">
                <div class="w-1/3 py-2 px-4 border-gray-500" :class="i != 0 ? 'border' : 'border-b border-l border-r'" v-text="item.key"></div>
                <div class="w-1/3 py-2 px-4 border-gray-500" :class="i != 0 ? 'border' : 'border-b border-l border-r'" v-text="item.value"></div>
                <div class="w-1/3 py-2 px-4 border-gray-500" :class="i != 0 ? 'border' : 'border-b border-l border-r'" v-text="item.description"></div>
            </div>
        </div>
    </div>    
</template>
<style scoped>
</style>