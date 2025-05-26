<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";
    import { AccountsAPI } from '@/api/accounts/accounts.api';
    import ArtisticLoadingScreen from '@/components/shared/loading/ArtisticLoadingScreen.vue';
    import { NotificationService } from "@/components/shared/notification/notification.service";
    
    const route = useRoute();
    const isLoading = ref<boolean>(true);
    const notificationService: NotificationService = NotificationService._getInstance();

    onMounted(async ()=>{
        const id: string = route.params.id.toString();
        const code: string = route.params.code.toString();
        isLoading.value = !await AccountsAPI.verifyAccount(id, code);
        if (!isLoading.value) await redirect_smoth();
    })

    async function redirect_smoth(): Promise<void> {
        notificationService.sendNotification({severity:"SUCCESS", message:"Your Account got verified! You get redirected in a sencond"})
        setTimeout(()=>{
            document.location.href = "https://www.njoyporn.com/";
        }, 2000)
    } 

</script>

<template>
    <ArtisticLoadingScreen v-if="isLoading" />
</template>

<script scoped>
</script>