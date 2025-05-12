<script setup lang="ts">

const props = defineProps<{
    text:string;
    classes?:string;
}>();

const emit = defineEmits(["button-confirm"]);

</script>

<template>
    <div class="button-primary" 
        :class="classes"
        data-testid="primary-button"
        @click="emit('button-confirm')">
        {{ text }}
    </div>
</template>

<style scoped>
</style>