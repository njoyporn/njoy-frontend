<script setup lang="ts">
    import type { CMDMD } from "./editor.type";
    import { copyToClipboard } from '@/components/shared/utils/copytoclipboard.utils';

    const props = defineProps<{
        cmds: CMDMD[];
    }>();

</script>

<template>
    <div class="border rounded-md border-gray-500 w-3/4 mb-12" id="commands">
        <div class="group grid grid-cols-[2rem_1fr_3rem] min-h-12 items-center" v-for="(cmd, i) of cmds">
            <div class="bg-gray-500 flex justify-center items-start pt-1 h-full" v-text="cmd.enum"></div>
            <div class="px-4" :class="cmd.cmd[0]=='#' ?'font-thin' : ''" :style="cmd.indent ? `padding-left: ${cmd.indent}rem`:''" v-text="cmd.cmd" :id="cmd.id"></div>
            <div class="transition-all duration-100 scale-0 origin-left group-hover:scale-100"><img class="h-8" src="/icons/ide/copytoclipboard.svg" @click="copyToClipboard(cmd.id)" /></div>
        </div>
    </div>
</template>

<style scoped>
</style>