<script setup lang="ts">
    import { ref, watch, onMounted } from "vue";

    const props = defineProps<{
        input: boolean;
        label: string;
        style?: string;
        wrapperClasses?: string;
        labelClasses?: string;
    }>();

    const emit = defineEmits<{
        (e: "update:input", input: boolean): void;
    }>();

    const input = ref<boolean>(false);

    onMounted(() => {
        input.value = props.input
    })

    watch(()=>props.input, ()=>{
      input.value = props.input
    })
    watch(
        () => input.value,
        () => {
            emit("update:input", input.value);
        }
    )
</script>

<template>
    <div class="w-full flex" :class="wrapperClasses">
        <input class="w-8" type="checkbox" v-model="input" :style="style"/>
        <label class="w-full text-3xl font-semibold p-2" v-text="label" :class="labelClasses"></label>
    </div>
</template>

<style>

</style>