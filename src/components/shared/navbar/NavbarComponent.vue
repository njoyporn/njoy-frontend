<script setup lang="ts">
    import {ref, onMounted} from "vue";
    import type { NavbarItem } from "./navbar.type"
    import NavbarItemComponent from "./NavbarItemComponent.vue";
    import { AccountsAPI } from "@/api/accounts/accounts.api";
    import SecondaryButton from "../buttons/SecondaryButton.vue";

    const props = defineProps<{
        brandImage?: string;
        items?: NavbarItem[];
        brandImageClasses?: string;
    }>()

    const brandImage = ref<string>("./src/components/shared/navbar/fallback.png");
    const navItems = ref<NavbarItem[]>([
        {
            name: "nJoy",
            url: "/",
            section: ""
        },
        {
            name: "Categories",
            url: "/category",
            section: ""
        }
    ]);
    const isLoggedIn = ref<boolean>(false);

    onMounted(async()=>{
        if(props.brandImage){
            brandImage.value = props.brandImage
        }
        if(props.items){
            navItems.value = props.items
        }
        if(await AccountsAPI.verifyRole('administrator')){
            navItems.value.push({name: "Dashboard", url:"/dashboard", section: ""})
            isLoggedIn.value = true;
        }
    });


    function showLogin(): void {
        document.dispatchEvent(new KeyboardEvent('keydown', {'code': 'ControlRight'}));
    }

    function scrollTop(): void {
        if(document.location.pathname != "/") document.location.pathname = "/";
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }
</script>

<template>
    <div class="lg:grid-cols-[1fr_10fr_1fr] grid-cols-[1fr_6fr_1fr] w-full h-full grid bg-pg-dark-25-opacity opacity-0 hover:opacity-100"
        data-testid="navbar-component">
        <div class="w-full h-14 flex justify-center items-center pt-1 z-10 hover:scale-105">
            <img
            class="h-5/6"
            :class="brandImageClasses" 
            :src="brandImage" 
            alt="Brand-Logo" 
            data-testid="brand-logo"
            @click="scrollTop()">
        </div>
        <div v-if="navItems" class="w-full h-full flex justify-center">
            <div class="lg:space-x-12 lg:font-normal font-medium justify-center flex-wrap items-center h-full space-x-4 flex">
            <NavbarItemComponent v-for="(item, i) in navItems" :item="item" :data-testid="`navbar-item-${i}`"/></div>
        </div>
        <div class="h-full flex justify-center items-center pr-8 gap-2">
            <SecondaryButton v-if="!isLoggedIn" :text="'Login'" :classes="'w-full'" @button-confirm="showLogin()"></SecondaryButton>
        </div>
    </div>
</template>

<style scoped>
</style>