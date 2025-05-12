<script setup lang="ts">
    import CartButtonComponent from "./../buttons/CartButtonComponent.vue";
    import type { Card } from "./cards.type";

    const props = defineProps<{
        card:Card
    }>();
</script>

<template>
    <div class="flex flex-wrap justify-center p-4 w-3/12
                border-2 rounded-2xl 
                bg-gradient-to-r from-[#55afaf79] to-[#2490d879] shadow-xl"
                data-testid="card-component">
        <img class="h-3/6 w-full rounded-md opacity-100 hover:scale-105" :src="card.imgSrc">
        <h4 class="w-full text-white font-bold text-2xl">{{ card.name }}</h4>
        <p class="flex w-6/12 justify-center items-center font-bold text-white" v-if="card.price"> {{ card.price }} € / g
            <span class="bg-teal-600"></span>
        </p>
        <CartButtonComponent></CartButtonComponent>
    </div>
</template>

<style scoped>

</style>