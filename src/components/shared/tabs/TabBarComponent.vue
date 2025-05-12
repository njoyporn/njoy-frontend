<script setup lang="ts">
    import { useRoute } from "vue-router";
    import type { Tab } from "./tab.type"
    import { onMounted, ref } from "vue";
    import { watch } from "vue";

    const route = useRoute(); 

    const props = defineProps<{
        tabs: Tab[]
        wrapperClasses?:string;
    }>()

    const activeTab = ref<string>("");

    onMounted(()=>{
        setActiveTab(route.path);
    })

    watch( () => route.path, () => { setActiveTab(route.path); }
    )

    function isActive(route: string): boolean {
        return activeTab.value === route;
    }

    function setActiveTab(route: string): void {
        props.tabs.forEach((tab) => {
            if(tab.route === route ){
                activeTab.value = tab.route;
            }
        })
    }

</script>

<template>
    <div class="w-full h-12 flex space-x-1" :class="wrapperClasses">
        <div class="w-auto h-full flex items-center justify-center p-2 px-8 text-white bg-gray-800 hover:bg-gray-700"
            :class="isActive(tab.route) ? 'border-t-2 border-fuchsia-700 bg-gray-600' : ''"
            v-for="(tab, i) of tabs" 
            :key="i">
            <img class="h-8 p-1" v-if="tab.icon" :src="tab.icon" />
            <router-link class="text-nowrap text-ellipsis"   
                     :to="tab.route" 
                     v-html="tab.name">
            </router-link>
        </div>
    </div>
</template>

<style scoped>
</style>