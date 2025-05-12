<script setup lang="ts">
    import type { Table, Cell, Row } from './editor.type';

    const props = defineProps<{
        table: Table
    }>()
</script>

<template>
    <div :class="table.classes" :style="table.style">
        <div :class="table.head.classes" :style="table.head.style">
            <div :class="cell.classes" :style="cell.style" v-for="(cell, i) of table.head.cells" v-text="cell.content">
            </div>  
        </div>

        <div :class="table.body.classes" :style="table.body.style">
            <div :class="row.classes" :style="row.style" v-for="(row, i) of table.body.rows" :key="i">
                <div :class="cell.classes" :style="cell.style" v-for="(cell, i) of row.cells" :key="i" v-text="cell.content"></div>
            </div>
        </div> 
    </div>
</template>

<style scoped>
</style>