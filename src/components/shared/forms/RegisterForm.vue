<script setup lang="ts">
    import { ref } from "vue";
    import PrimaryButton from '../buttons/PrimaryButton.vue';
    import type { RegisterDTO } from "@/types/account.type";
    import { AccountsAPI } from "@/api/accounts/accounts.api";
    import { NotificationService } from "../notification/notification.service";
    import type { BusinessResponse } from "@/types/core.types";

    const notficationService: NotificationService = NotificationService._getInstance();

    const account = ref<RegisterDTO>({
        username:"",
        email:"",
        password:"",
        re_password:""
    });

    async function register(): Promise<void>{
        const res: BusinessResponse<any> = await AccountsAPI.register(account.value);
        if (res.error !== null) notficationService.sendNotification({severity: "ERROR", message: res.message});
        else notficationService.sendNotification({severity: "SUCCESS", message: res.message});    
    }

</script>

<template>
    <div class="w-full h-full flex flex-wrap p-8 items-start justify-center">
        <h1 class="w-full h-1/6 text-6xl font-bold flex items-end justify-center">Create an Account</h1>
        <div class="w-1/2 flex flex-wrap justify-around">
            <input class="w-full bg-gray-800 p-2 rounded-xl min-h-12 max-h-32 color-white text-5xl mb-4" v-model="account.username" type="text" placeholder="Username">
            <input class="w-full bg-gray-800 p-2 rounded-xl min-h-12 max-h-32 color-white text-5xl mb-4" v-model="account.email" type="email" placeholder="E-Mail">
            <input class="w-full bg-gray-800 p-2 rounded-xl min-h-12 max-h-32 color-white text-5xl mb-4" v-model="account.password" type="password" placeholder="Password">
            <input class="w-full bg-gray-800 p-2 rounded-xl min-h-12 max-h-32 color-white text-5xl mb-4" v-model="account.re_password" type="password" placeholder="Repeat Password">
            <PrimaryButton :text="'Register'" @click="register" :classes="'w-full h-20'"></PrimaryButton>
        </div>
    </div>
</template>

<style scoped>
</style>