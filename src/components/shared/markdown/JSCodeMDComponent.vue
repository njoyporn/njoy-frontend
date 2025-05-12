<script setup lang="ts">
/* To use this this component the vue3-highlightjs package needs to be installed
 * - run 'npm i vue3-highlightjs' to install the library
 *
 * Example on how to use the library
 *   <pre v-highlightjs><code class="javascript">const s = new Date().toString()</code></pre>
 */

    const porps = defineProps<{
        code: string;
    }>();
</script>

<template>
    <div class="">
        <pre v-highlightjs>
        <code class="javascript custom" v-text="code"></code>
    </pre>
    </div>
</template>

<style scoped>
    .custom {
        background-color: rgba(32,32,32,.98);
    }
</style>