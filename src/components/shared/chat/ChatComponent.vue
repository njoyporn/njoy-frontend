<script setup lang="ts">
    import type { Connection } from "@/types/socket.type";
    import type { Message, User, Options } from "@/types/chat.type";
    import { _options } from "@/types/chat.type";
    import { onMounted, ref, watch } from "vue";
    import ChatContainer from "./ChatContainer.vue";
    import ChatMemberList from "./ChatMemberList.vue";
    import TextInput from "@/components/shared/forms/TextInput.vue";
    import PrimaryButton from "@/components/shared/buttons/PrimaryButton.vue";
    import SecondaryButton from "@/components/shared/buttons/SecondaryButton.vue";
    import { ChatService } from "@/services/chat.service";
    import { NotificationService } from "@/components/shared/notification/notification.service";

    const chatService: ChatService = ChatService._getInstance();

    const connection = ref<Connection>(chatService.getConnection());
    const message = ref<string>("");
    const messages = ref<Message[]>([]);
    const chatUser = ref<User>(chatService.getChatUser());
    const chatUserList = ref<User[]>(chatService.getChatUserList());
    const timer = ref<number>(0);
    const chatContainer = ref<HTMLElement|null>();
    const notificationService: NotificationService = NotificationService._getInstance();

    let observer = null;

    const props = defineProps<{
        wrapperClasses?: string;
        custom_options?: Options
    }>();

    const options = ref<Options>(_options);

    onMounted(async ()=>{
        if (props.custom_options) {
            options.value = {...options.value, ...props.custom_options}
        }
        chatContainer.value = document.getElementById("chat-container");
        if (!chatContainer.value) return;
        observer = new IntersectionObserver(triggerIntroMessage, {
            threshold: 0.5, // proportion of element visible to trigger action
        });
        observer.observe(chatContainer.value);
        chatService.run();
        loop();
    })



    async function loop(): Promise<void>{
        //ka warum watch nicht geht
        timer.value++
        await new Promise(resolve => setTimeout(resolve, 1000));
        messages.value = chatService.getMessages()
        connection.value = chatService.getConnection();
        chatUser.value = chatService.getChatUser();
        chatUserList.value = chatService.getChatUserList();

        //habs nur 4 tages später anständig gelöst :)
        // await updateUserList(); //weil ich so faul bin... //nächster tag immer noch faul... => ich will in der socket.api lauschen ob wer neues kommt. kann sein das ich das chat_backend anpassen muss um das event zu senden.
        await loop();
    }

    function triggerIntroMessage(): void {
        if(timer.value > 10 && message.value == "" && messages.value.length == 0){
            spawnIntroMessage();
        }
    }

    function goOnline(): void {
        chatService.emit("handshake");
        notificationService.sendNotification({severity: "SUCCESS", message: "Your are now online and ready to chat"})
    }

    watch(()=>connection.value.confirmed, ()=>{connection.value.confirmed = connection.value.confirmed})

    function spawnIntroMessage(): void {
        messages.value.push(chatService.getIntroMessage());
    }

    function sendMessage(): void {
        if (!connection.value.confirmed) {
            notificationService.sendNotification({severity: "ERROR", message: "You need to connect the chat first"})
            return;
        }
        if(message.value == "") {
            notificationService.sendNotification({severity: "ERROR", message: "You need to enter a message first"})
            return;
        }
        chatService.updateMessageList({uid:chatUser.value.uid, msg:message.value, rusername:chatUser.value.rusername, socketId: connection.value.socketId, date:new Date()});
        chatService.emit("send-message", message.value)
        message.value = "";
    }

</script>

<template>
    <div v-if="connection" class="flex flex-wrap w-full h-full" :class="wrapperClasses" id="chat-container">
    <div class="w-full h-full p-8">
        <div class="flex flex-wrap justify-between items-center w-full h-1/6 px-8 py-6 border-b "
             :class="options.headWrapper">
            <h4 class="h-full lg:w-1/4 w-1/3 items-center flex px-1 lg:px-2 text-white font-medium text-sm lg:text-4xl">Online: {{ connection.confirmed ? 'Yes' : 'No' }}</h4>
            <h4 class="h-full w-1/3 items-center justify-start flex px-1 lg:px-2 font-medium text-center text-2xl lg:text-6xl animate-pulse" :class="options.getInTouch">Get In Touch</h4>
            <SecondaryButton :classes="options.secondaryButton" @button-confirm="goOnline" :text="'Connect!'"></SecondaryButton>
        </div>
        <div class="w-full h-4/6 grid grid-cols-[1fr_4fr] lg:grid-cols-[1fr_3fr] p-2 lg:p-8">
            <ChatMemberList :userList="chatUserList" :options="options"></ChatMemberList>
            <ChatContainer :messages="messages" :chatUser="chatUser" :options="options"></ChatContainer>
        </div>
        <div class="grid grid-cols-[3fr_1fr] justify-around gap-16 items-center h-1/6 border-t" :class="options.footerWrapper">
            <TextInput v-model:input="message" :placeholder="'Enter your message here...'" :classes="'shadow-md w-full border h-24 lg:h-24 text-xl lg:4xl placeholder:text-xl'" @keyup.enter="sendMessage"></TextInput>
            <PrimaryButton :text="'Send'" :class="options.primaryButton" @button-confirm="sendMessage"></PrimaryButton>
        </div>
    </div>
</div>
</template>