<script setup lang="ts">
  // import { RouterView } from 'vue-router'
  import { ref, onMounted } from 'vue';
  import type { NotificationMessage } from './types/api.type';
  import { NotificationService } from './components/shared/notification/notification.service';
  import NotificationComponent from './components/shared/notification/NotificationComponent.vue';
  import LoginFullScreenOverlayComponent from './components/shared/login/LoginFullScreenOverlayComponent.vue';


  const notificationService: NotificationService = NotificationService._getInstance();
  const activeNotification = ref<NotificationMessage>({severity:"SUCCESS", message: "WHY?"});
  const showLogin = ref<boolean>(false);

  onMounted(() => {
    notificationService.getNotifications().subscribe(notification => activeNotification.value = notification)
    document.addEventListener("keydown", onKeyPress)
  })

  function onKeyPress(e: KeyboardEvent): void {
    console.log(e.code)
    if (e.code == "ControlRight"){

      showLogin.value = !showLogin.value;
    }
  }
</script>

<template>
  <div class="w-screen h-screen text-white bg-pg-zero-to-dark-0-100">
    <LoginFullScreenOverlayComponent v-if="showLogin" @close="showLogin = false"></LoginFullScreenOverlayComponent>
    <router-view></router-view>
    <NotificationComponent v-if="activeNotification" :notification="activeNotification"></NotificationComponent>
  </div>
</template>

<style scoped>

</style>
