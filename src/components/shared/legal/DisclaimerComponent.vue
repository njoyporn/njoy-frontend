<script setup lang="ts">
    import { ref } from "vue";
    const suitUp = ref<boolean>(false)
</script>

<template>
    <h1 class="w-full text-6xl text-center font-bold text-white p-4">Disclaimer</h1>
    <p class="w-full text-center">This website is a personal project and basically the equivalent to Barney Stinson's porn shelf</p>
    <div class="w-full p-2 flex justify-center items-center">
        <img class="rounded-md" src="/shelf.png" @mouseenter="suitUp = true" @mouseleave="suitUp = false">
    </div>
    <Transition name="fade">
    <h1 v-if="suitUp" class="text-6xl text-center">Suit Up!</h1>
    </Transition>
    <div class="text-3xl fixed w-full bottom-0 flex justify-center gap-2 items-center">
      <p>More about the application on Github:</p>
      <a href="https://github.com/njoyporn">
        <img src="/icons/ide/gitlab.svg" />
      </a>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>