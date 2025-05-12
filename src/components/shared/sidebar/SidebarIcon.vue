<script setup lang="ts">
    const props = defineProps<{
        iconName: string;
        useAssets?: boolean;
        tooltip?: string;
    }>();

</script>

<template>
    <div class="sidebar-icon group">
        <img v-if="useAssets" class="w-11" :src='`/src/assets/svg/${iconName}.svg`' :alt="iconName" data-testid="icon-image-assets">
        <img v-else class="w-11" :src='`/src/components/shared/sidebar/svg/${iconName}.svg`' :alt="iconName" data-testid="icon-image">
        <span class="sidebar-tooltip group-hover:scale-100" data-testid="icon-tooltip">
            {{ tooltip || '- missing -' }}
        </span>
    </div>

</template>

<style scoped>

</style>