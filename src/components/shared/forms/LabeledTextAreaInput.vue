<script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps<{
        input:string;
        label: string;
        placeholder?:string;
        style?: string;
        labelClasses?: string;
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
    <div class="w-full" :class="labelClasses">
        <label class="text-3xl font-semibold p-2" :class="labelClasses" v-text="label"></label>
        <textarea class="w-full bg-gray-800 p-2 rounded-xl min-h-64 h-64 color-white text-4xl resize-none z-20" :style="style" v-model="input" :placeholder="placeholder"></textarea>
    </div>
</template>

<style>

</style>