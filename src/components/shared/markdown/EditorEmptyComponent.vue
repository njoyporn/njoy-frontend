<script setup lang="ts">
import { resolveIconSrc } from '@/components/shared/utils/images.utils';


</script>

<template>
    <div class="w-full h-full bg-black-600 grid grid-rows-[8fr_1fr_1fr_1fr_1fr_6fr] justify-center items-center text-white">
        <img class="opacity-20 max-h-60 w-auto m-auto justify-center items-center" src="/brandLogo.png">
        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <p class="flex justify-end">Show all commands</p>
            <p class="">
                <span class="border rounded-md border-white px-2">Ctr</span>
                +
                <span class="border rounded-md border-white px-2">Shift</span>
                +
                <span class="border rounded-md border-white px-2">P</span>
            </p>
        </div>
        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <p class="flex justify-end">Create File</p>
            <p class="">
                <span class="border rounded-md border-white px-2">Ctr</span>
                +
                <span class="border rounded-md border-white px-2">Shift</span>
                +
                <span class="border rounded-md border-white px-2">F</span>
            </p>
        </div>
        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <p class="flex justify-end">Go to Page</p>
            <p class="">
                <span class="border rounded-md border-white px-2">Ctr</span>
                +
                <span class="border rounded-md border-white px-2">N</span>
            </p>
        </div>
        <div class="grid grid-cols-[1fr_1fr] gap-4">
            <p class="flex justify-end">Debug</p>
            <p class="">
                <span class="border rounded-md border-white px-2">Ctr</span>
                +
                <span class="border rounded-md border-white px-2">Shift</span>
                +
                <span class="border rounded-md border-white px-2">C</span>
            </p>
        </div>
        <div hidden></div>
    </div>
</template>

<style scoped>
</style>