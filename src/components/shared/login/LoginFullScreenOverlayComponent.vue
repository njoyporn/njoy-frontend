<script setup lang="ts">
    import { AccountsAPI } from '@/api/accounts/accounts.api';
    import { ref } from 'vue';
    import SimpleLoading from '../loading/SimpleLoading.vue';

    const isLoading = ref<boolean>(false)
    const username = ref<string>("")
    const password = ref<string>("")

    const emit = defineEmits<{
        (e: "close"): void
    }>()

    async function doLogin(): Promise<void> {
        if(!username || !password) return;
        isLoading.value = true;
        const res: boolean = await AccountsAPI.loginAccount(username.value, password.value)
        isLoading.value = false;
        if(res) {
            emit("close");
            document.location.href = "/dashboard";
        }
    }

    function redirectToRegister(): void {
        document.dispatchEvent(new KeyboardEvent('keydown', {'code': 'AltRight'}));
        document.location.href = "/register"
    }

</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-25 absolute z-[100]" @keydown.enter="doLogin()">
        <SimpleLoading v-if="isLoading"></SimpleLoading>
        <div v-else class="w-[32rem] h-[32rem] border-2 rounded-lg bg-gray-800 p-4 grid grid-rows-[1fr_2fr_4fr_2fr_4fr_6fr_1fr] gap-2">
            <div class="w-full flex justify-end"><button class="border hover:border-2 hover:shadow-2xl rounded-full mb-8 w-8 h-8 bg-red-500 font-bold text-[1rem]" @click="emit('close')">X</button></div>
            <label class="text-3xl font-semibold w-full h-12">Username</label>
            <input class="w-full h-16 rounded-md bg-gray-600" type="text" v-model="username" autofocus>
            <label class="text-3xl font-semibold w-full h-12">Password</label>
            <input class="w-full h-16 rounded-md bg-gray-600" type="password" v-model="password">
            <button class="w-full border-2 rounded-lg bg-fuchsia-400 hover:bg-orange-500 h-24" type="button" @click="doLogin()">Login</button>
            <p class="text-center text-xl cursor-pointer" @click="redirectToRegister()">Or Register HERE</p>
        </div>
    </div>
    
</template>

<style scoped>
</style>