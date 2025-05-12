<script setup lang="ts">

const props = defineProps<{
    text:string;
    classes?:string;
    to?: string;
}>();

const emit = defineEmits<{
    (e: "click-button"): void;
}>()

</script>

<template>
    <router-link :to="to ?? '/'" :class="classes" class="border-4 rounded-lg  w-64 bg-white bg-opacity-45 lg:h-20 justify-end flex button-play"><span class="h-full flex items-center text-3xl font-extrabold pl-8 py-2" @click="emit('click-button')">PLAY</span><img class="h-16" src="/icons/play-animated.svg"></router-link>
</template>

<style scoped>

.button-play{
    background: linear-gradient(90deg, rgba(233, 25, 240, 0.85) 0%, rgba(241, 171, 230, 0.9) 60%);
    /* border: 0px solid white; */
    /* border-radius: 1rem; */
    color: #fff;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 20;
    box-shadow: 2px 3px 4px rgba(32, 32, 32, 0.9);

    cursor: pointer;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    min-height: 3rem;
    min-width: 8rem;
    /* width: 8rem; */
}

.button-play:before{
    content: "";
    /* border-radius: 1rem; */
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, rgb(240, 44, 240) 20%, rgb(238, 12, 181) 80%);
    transition: all .2s;
    z-index: -1;
}

.button-play:hover:before{
    width: 100%;
}
</style>