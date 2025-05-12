<script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps<{
        style?: string;
    }>();

    const emit = defineEmits<{
        (e: "on-update", text: string): void;
    }>();

    const input = ref<string>("");

    watch(
        () => input.value,
        () => {
            emit("on-update", input.value);
        }
    )
</script>

<template>
    <textarea class="w-full bg-gray-800 p-2 rounded-xl min-h-64 h-64 color-white text-4xl resize-none z-20" :style="style" v-model="input"></textarea>
</template>

<style>

</style>