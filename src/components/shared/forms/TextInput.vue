<script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps<{
        input:string;
        style?: string;
        classes?: string;
        placeholder?: string;
    }>();

    const emit = defineEmits<{
        (e: "update:input", text: string): void;
    }>();

    const input = ref<string>("");

    watch(
        () => input.value,
        () => {
            emit("update:input", input.value);
        }
    )

    watch(
        () => props.input,
        () => {
            input.value = props.input;
        }
    )
</script>

<template>
    <input class="w-full bg-gray-800 p-2 rounded-xl min-h-12 max-h-32 color-white text-6xl text-white z-20" :class="classes" :style="style" :placeholder="placeholder" v-model="input">
</template>

<style scoped>
input::placeholder {
  font-size: 2rem;
  opacity: 0.5;
}
</style>