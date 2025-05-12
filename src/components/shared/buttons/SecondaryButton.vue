<script setup lang="ts">

const props = defineProps<{
    text:string;
    classes?:string;
}>();

const emit = defineEmits(["button-confirm"]);

</script>

<template>
    <div class="button-secondary"
        :class="classes"
        data-testid="secondary-button"
        @click="emit('button-confirm')">
        {{ text }}
    </div>
</template>

<style scoped>
</style>