<script setup lang="ts">
    import type { User, Options } from '@/types/chat.type';
    import { onMounted, ref } from 'vue';
    import { ChatAPI } from '@/api/chat/chat.api';

    const props = defineProps<{
        userList: User[] | null
        options: Options
    }>()

</script>

<template>
    <div class="w-full -h-full grid grid-cols-[auto_.5rem] lg:grid-cols-[auto_2rem]">
        <div class="w-full h-full gird grid-flow-row">
            <h2 class="text-xl lg:text-4xl w-full text-center p-1 lg:p-4 text-sky-500">User-List</h2>
            <div class="h-0 mx-1 lg:mx-4 border-b text-2xl text-center" :class="options.memberListHeadSeperator"></div>
            <div class="w-full px-0 lg:px-8" v-if="userList">
                <div v-for="(user, i) of userList" class="flex flex-wrap w-full py-2" :class="i%2==0 ? options.memberListColor!.odd : options.memberListColor!.even">
                    <h4 class="text-sm lg:text-2xl text-center">{{ user.rusername }}</h4>
                    <span class="text-2xl text-start" v-if="false">...</span>
                </div>
            </div>
        </div>
        <div class="" :class="options.memberListSeperator"></div>
    </div>

</template>

<style scoped>
</style>