<script setup lang="ts">
    import type { NavbarItem } from "./navbar.type";

    const props = defineProps<{
        item:NavbarItem;
    }>();

</script>

<template>
    <a v-if="item.href" class="hover:scale-110 hover:font-bold text-2xl text-white flex items-center z-20" :href="item.href">{{ item.name }}</a>
    <router-link v-else :to="item.url" class="hover:scale-110 hover:font-bold text-2xl text-white flex items-center"
            data-testid="navbar-item">{{ item.name }}</router-link>
</template>

<style>

</style>