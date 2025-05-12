<script setup lang="ts">
    import { watch } from "vue";
    import type { Message, User, Options } from "@/types/chat.type.ts";
    import ChatMessage from "./ChatMessage.vue";

    const props = defineProps<{
        chatUser: User;
        messages: Message[];
        options: Options;
    }>()

    watch(
        ()=>props.messages.length,
        ()=>{
            const chatHistory: HTMLElement | null = document.getElementById("chat-history");
            if(!chatHistory) return;
            chatHistory.scrollTo(0, document.body.scrollHeight);
        }
    )
</script>

<template>
    <div class="w-full h-full overflow-y-auto p-2 lg:p-8" id="chat-history">
        <transition-group name="slide-fade" tag="div">
        <div class="w-full flex" v-for="(message, i) of messages" v-bind:key="i" :class="chatUser.uid != message.uid ? 'justify-start' : 'justify-end'">
            <ChatMessage :chat-user="chatUser" :message="message" :cid="i" :options="options"></ChatMessage>
        </div>
        </transition-group>
        <!-- Wenn ich nicht die scrollheight fixe muss ich den scheiß hier lassen-->
        <div class="grid w-full p-2">
            <h3 class="text-xl lg:text-3xl text-white px-3"></h3>
            <p class="min-h-16 text-base lg:text-2xl text-white p-4"></p>
            <p class="text-sm lg:text-2xl max-h-8 px-4 text-white flex items-center">
                <img class="h-4 lg:h-6 w-auto"/>
            </p>
        </div>
        <div class="grid w-full p-2">
            <h3 class="text-xl lg:text-3xl text-white px-3"></h3>
            <p class="min-h-16 text-base lg:text-2xl text-white p-4"></p>
            <p class="text-sm lg:text-2xl max-h-8 px-4 text-white flex items-center">
                <img class="h-4 lg:h-6 w-auto"/>
            </p>
        </div>
    </div>
</template>

<style scoped>
    .slide-fade-enter-active {
    transition: all 0.8s ease-out;
    }

    .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
    }
</style>