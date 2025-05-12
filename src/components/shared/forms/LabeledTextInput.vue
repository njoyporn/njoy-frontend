<script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps<{
        input:string;
        label: string;
        style?: string;
        classes?: string;
        labelClasses?: string;
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
    <div class="w-full h-full grid">
        <label class="text-3xl font-semibold p-2" :class="labelClasses" v-text="label"></label>
        <input class="w-full bg-gray-800 p-2 rounded-xl min-h-12 h-16 max-h-32 color-white text-4xl text-white z-20" :class="classes" :style="style" :placeholder="placeholder" v-model="input">
    </div>
</template>

<style scoped>
input::placeholder {
  font-size: 2rem;
  opacity: 0.5;
}
</style>