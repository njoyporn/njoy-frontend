<script setup lang="ts">
    import type { DIRECTION } from './navigation.type';

    const props = defineProps<{
        direction: DIRECTION;
        bold?: boolean;
    }>();

</script>

<template>
    <div class="flex items-center h-8" :class="direction === 'left' ? 'scale-x-[-1]' : ''">
        <svg v-if="bold" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16m0 0l-6 6m6-6l-6-6" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" d="M3 12.013L20.789 12m-6.776 7L21 12l-6.988-7" />
        </svg>
    </div>
</template>

<style scoped></style>