<script setup lang="ts">
    import type { Message, User, Options } from '@/types/chat.type';
    import { resolveIconSrc } from '@/components/shared/utils/images.utils';
    import { onMounted, ref } from 'vue';
    import { ColorHelper } from '@/components/shared/utils/color.helper';

    const colorHelper: ColorHelper = new ColorHelper();

    const colorChange = ref<number>(0);
    onMounted(()=>{
        const element: HTMLElement | null = document.getElementById(`chat-message-${props.cid}`);
        if(!element) return;
        element.onmousemove = e => {colorChange.value = e.clientX / element.offsetWidth}
    })

    const props = defineProps<{
        message: Message;
        chatUser: User
        cid: number;
        options: Options
    }>()

    function calcColor(): string {
        return props.chatUser.uid == props.message.uid ? 
            colorHelper.interpolateColour(props.options.message!.user.backgroundColorA,props.options.message!.user.backgroundColorB, colorChange.value) : 
            colorHelper.interpolateColour(props.options.message!.participent.backgroundColorA,props.options.message!.participent.backgroundColorB, colorChange.value)
    }
</script>

<template>
    <div class="grid w-3/4 p-1 lg:p-2" :class="chatUser.uid != message.uid ? 'justify-start' : 'justify-end'">
        <h3 class="text-xl lg:text-3xl text-white px-3" :class="chatUser.uid != message.uid ? `text-start border-b-2 border-l rounded-bl-md border-l-${options.message!.participent.borderColor} border-b-${options.message!.participent.borderColor}` 
            : `text-end border-b-2 border-r rounded-br-md font-medium border-r-${options.message!.user.borderColor} border-b-${options.message!.user.borderColor}`"><span class="font-thin text-sm lg:text-xl">by</span> {{ message.rusername }}</h3>
        <p class="min-h-16 text-base lg:text-2xl text-white p-4 bg-opacity-25" :class="chatUser.uid != message.uid ? `text-start border-r border-r-${options.message!.participent.borderColor}` 
            : `text-end border-bl-md border-l bg-${options.message!.user.borderColor} border-l-${options.message!.user.borderColor}`"
            :id="`chat-message-${cid}`"
            :style="`background-color: ${calcColor()}`">{{ message.msg }}</p>
        <p class="text-sm lg:text-2xl max-h-8 px-2 text-white flex items-center shadow-lg" :class="chatUser.uid != message.uid ? `justify-start border-r shadow-fuchsia-500/50 border-r-${options.message!.participent.borderColor}` : `justify-end border-l shadow-sky-500/50 border-br-${options.message!.user.borderColor} border-l-${options.message!.user.borderColor}`">
            <img class="h-4 lg:h-6 w-auto" :src="resolveIconSrc('clock_animated.svg')" />: {{ new Date(`${message.date}`).toLocaleString("de-DE",{day:"2-digit",month:"2-digit", year:"numeric", minute:"numeric", hour:"numeric", second:"numeric"}) }}
        </p>
    </div>
</template>

<style scoped>
</style>