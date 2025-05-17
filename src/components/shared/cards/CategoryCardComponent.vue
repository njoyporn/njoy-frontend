<script setup lang="ts">
import type { Category } from '@/types/category.type';
import { getRandomRange } from '../random/random.number';

    const props = defineProps<{
        card: Category
    }>()

    function rollThumbnail(): number {
        return getRandomRange(props.card.thumbnails.length - 1);
    }
"https://api.njoyporn.com/category-service/api/v1/thumbnail"
    function deriveImageUrl(): string {
        const ind: number = rollThumbnail();
        return `https://api.njoyporn.com/category-service/api/v1/thumbnail?id=${props.card.id}&iid=${props.card.thumbnails[ind]}`
    }
</script>

<template>
    <div class="lg:w-1/6 w-1/3 h-auto border-sky-400 rounded-xl relative shadow-lg shadow-cyan-500/50 cursor-pointer box hover:scale-110">
        <img class="w-full h-full rounded-md" :src="deriveImageUrl()">
        <div class="absolute bottom-2 w-full flex justify-center">
            <p class="lg:px-10 px-2 lg:py-2 text-bg rounded-full text-center lg:text-3xl text-sm font-bold">{{ card.name.toUpperCase() }}</p>  
        </div> 
    </div>
</template>

<style scoped>
@keyframes rotate {
  to {--angle: 360deg;}
}
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 6px solid #0000;
  background: linear-gradient(#131219, #131219) padding-box, linear-gradient(
        var(--angle),
        #f01be5,
        #458eec
      ) border-box;
  animation: 6s rotate linear infinite;
}

.text-bg {
    background: rgba(182, 52, 85, .75);
background: radial-gradient(circle,rgba(219, 46, 199, 0.1) 0%, rgba(230, 30, 143, 0.8) 90%, rgba(230, 30, 143, 0.01) 100%);
}
</style>