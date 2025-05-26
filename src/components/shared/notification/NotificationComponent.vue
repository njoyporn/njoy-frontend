<script setup lang="ts">

    import { ref, watch } from 'vue';
    import type { NotificationMessage } from '@/types/api.type';
    import { resolveIconSrc } from '../utils/images.utils';

    const props = defineProps<{
        notification:NotificationMessage;
    }>();

    const isActive = ref<boolean>(false);
    const ACTIVE_DURATION: number = 5000;
    let timeout: any;

    watch(()=>props.notification, () => {
        isActive.value = true;
        if (timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
                isActive.value = false;
            }, ACTIVE_DURATION
        );
    });

</script>


<template>
    <div v-if="isActive" class="lg:left-[40%] lg:w-[20%]
                                left-[5%] w-[90%] fixed top-32 min-h-24 rounded-[1rem] grid grid-cols-[4rem_auto] gap-4 bg-opacity-90 z-50 justify-start items-center border-white p-2" 
        :class="{
            'bg-green-500 border-2' : notification.severity == 'SUCCESS', 
            'bg-red-500 border-2' : notification.severity == 'ERROR',
            'bg-orange-500 border-2' : notification.severity == 'WARNING'
        }">
        <img class="w-16 h-16 flex justify-center" :src="notification.severity == 'ERROR' ?  resolveIconSrc('error.svg') : notification.severity === 'SUCCESS' ? resolveIconSrc('check.svg') : resolveIconSrc('warn.svg')">
        <p class="text-white text-justify flex items-center text-3xl font-semibold" v-html="notification.message"></p>
    </div>
</template>