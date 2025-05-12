<script setup lang="ts">
    import type { Quote } from "@/types/quote.type";

    const props = defineProps<{
        quote:Quote|null;
    }>()

</script>

<template>
    <div v-if="quote" class="w-96 h-fit p-2 flex flex-wrap border rounded-md border-l-yellow-50">
        <h2 class="text-3xl text-white w-full" v-html="quote.author"></h2>
        <p class="text-xl text-white w-full p-2" v-html="quote.quote"></p>
    </div>
</template>

<style scoped></style>