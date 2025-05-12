<script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps<{
        input: boolean;
        label: string;
        style?: string;
        wrapperClasses?: string;
        labelClasses?: string;
    }>();

    const emit = defineEmits<{
        (e: "on-update", input: boolean): void;
    }>();

    const input = ref<boolean>(false);

    watch(
        () => input.value,
        () => {
            emit("on-update", input.value);
        }
    )
</script>

<template>
    <div class="w-full flex" :class="wrapperClasses">
        <input class="w-8" type="checkbox" :style="style"/>
        <label class="w-full text-3xl font-semibold p-2" v-text="label" :class="labelClasses"></label>
    </div>
</template>

<style>

</style>