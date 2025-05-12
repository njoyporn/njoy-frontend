<script setup lang="ts">
    import { ref } from "vue";
    const props = defineProps<{
        btnText: string;
    }>();

    const fileName = ref<string>("Select a video to upload");

    const emit = defineEmits<{
        (e: "file-change", file: File): void;
    }>()

    function onFileChanged($event: Event) {
        const target = $event.target as HTMLInputElement;
        if (target && target.files) {
            fileName.value = target.files[0].name
            emit("file-change", target.files[0]);
        }
    }
</script>

<template>
    <div class="">
        <label for="file-input" class="border-2 rounded-lg p-2" v-text="btnText"></label>
        <input type="file" id="file-input" class="hidden" v-on:change="onFileChanged($event)"/>
        <label class="pl-2" v-text="fileName"></label>
    </div>
</template>

<style scoped>
</style>