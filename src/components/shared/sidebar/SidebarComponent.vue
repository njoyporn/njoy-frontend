<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import SidebarIcon from "./SidebarIcon.vue";
    import type { SidebarItem } from "./sidebar.type";
    import { SidebarService } from "./sidebar.service";

    const props = defineProps<{
        items?: SidebarItem[]
    }>();

    const sidebarService: SidebarService = new SidebarService();

    const currentItems = ref<SidebarItem[]>(sidebarService.createDefaultItems());

    function redirect(url: string): void{
        document.location.href = url;
    }

    onMounted(()=>{
        if(props.items){
            currentItems.value = props.items;
        }
    })

</script>

<template>
    <div class="h-full w-full m-0
                flex flex-col
                bg-gray-900 text-white shadow-lg">
        <SidebarIcon v-for="(item, i) in currentItems" :key="i" :iconName="item.name" :tooltip="item.tooltip" @click="redirect(item.url)" :data-testid="`sidebar-icon-${i}`"></SidebarIcon>
    </div>
</template>

<style scoped>

</style>