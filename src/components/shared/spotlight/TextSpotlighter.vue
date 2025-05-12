<script setup lang="ts">
    import { onMounted } from 'vue';
    import { AnimatorService } from './animator.service';
    import { gilltrickDE } from './animation.templates';
    import { getRandomRange } from '../random/random.number';


    const animatorService: AnimatorService = new AnimatorService();
    let index: number = 0;

    const props = defineProps<{
        wrapperStyle?: string;
        textStyle?: string;
        delay?: number
    }>();

    onMounted(async () => {
        const delay: number = props.delay ? props.delay : 7000
        await new Promise(resolve => setTimeout(resolve, delay));
        runQue()
    })

    async function runQue(){
        
        const currentIndex = index;
        await animatorService.playAnimation(gilltrickDE[index]);
        let newIndex = getRandomRange(gilltrickDE.length - 1)
        if(newIndex == currentIndex) newIndex++;
        if(newIndex >= gilltrickDE.length) newIndex = 0;
        index = newIndex;
        await runQue();
    }

</script>

<template>
    <div class="lg:h-auto h-full flex flex-wrap justify-end" :style="wrapperStyle">
        <div class="h-20 p-4 lg:w-1/2 lg:mr-12 lg:text-left w-full text-center text-sky-500 text-xl lg:text-4xl" :style="textStyle" v-html="animatorService.content.value"></div>
    </div>
</template>

<style scoped>
</style>