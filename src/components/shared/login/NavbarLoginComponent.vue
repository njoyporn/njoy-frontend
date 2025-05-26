<script setup lang="ts">
    import { ref } from "vue";
    import PrimaryButton from "../buttons/PrimaryButton.vue";
    import SecondaryButton from "../buttons/SecondaryButton.vue";
    import { AccountsAPI } from "@/api/accounts/accounts.api";
    import { HiddenStorage } from "../hiddenStorage/hiddenStorage.service";

    const props = defineProps<{
        placeholder?: string;
        placeholder_password?: string;
    }>();

    const email_address = ref<string>("");
    const password = ref<string>("");
    const hideLogin = ref<boolean>(true);
    const hiddenStorage = HiddenStorage._getInstance();

    async function login(): Promise<void>{
        let result: boolean = await AccountsAPI.loginAccount(email_address.value, password.value);
        hiddenStorage.add("verified",result);
        // console.log(hiddenStorage.get("verified"));
        hideLogin.value = true;
    }

</script>

<template>
    <div class="flex flex-wrap w-1/12 justify-center space-y-4 z-10">
    <PrimaryButton v-if="hideLogin" :text="'Login'" @click="hideLogin = !hideLogin"></PrimaryButton>
    <SecondaryButton v-else :text="'Abbrechen'" @click="hideLogin = !hideLogin"></SecondaryButton>
    <div v-if="!hideLogin" class="w-full h-60 border rounded-md bg-gray-800 flex flex-wrap justify-around items-center" @keyup.enter="login">
        <input class="w-5/6 h-10 rounded-l-md px-2 text-white bg-gray-600" v-model="email_address" :placeholder="placeholder ? placeholder : 'E-Mail'">
        <input class="w-5/6 h-10 rounded-l-md px-2 text-white bg-gray-600" v-model="password" :placeholder="placeholder_password ? placeholder_password : 'Password'">
        <PrimaryButton :text="'Login'" @click="login()"></PrimaryButton>
    </div>
    </div>
</template>

<style>

</style>