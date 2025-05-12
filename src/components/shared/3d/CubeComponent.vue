<script setup lang="ts">
    import { TresCanvas, useRenderLoop } from '@tresjs/core'
    import { OrbitControls } from '@tresjs/cientos'
    import { ref, onMounted, watch, shallowRef } from 'vue';
    import * as Three from 'three';
    import FloatingBubble from './FloatingBubble.vue';
    import { RandomText } from '../random/random.text';
    import { ColorHelper } from "../utils/color.helper";


    const randomText: RandomText = new RandomText();
    const colorHelper: ColorHelper = new ColorHelper();

    const isLoading = ref<boolean>(true);
    const showAnimation = ref<boolean>();
    const cubeWrapper = ref<HTMLElement|null>();
    const cubeRef = shallowRef<Three.Mesh>()
    const clickCounter = ref<number>(0);
    const textBubbleContent = ref<string>("Do not touch the Cube");
    const currentPosition = ref<{x:number,y:number}>({x:0, y:0})
    const backgroundRGBA = ref<string>("rgba(26,198,238,.9)")
    
    const lg = 1080;
    const a = screen.width > lg ? .5 : .25;
    const b = screen.width > lg ? .0625 : .03175
    const c = screen.width > lg ? .25 : .125
    const d = screen.width > lg ? 1/3 : 1/3
    const e = screen.width > lg ? 2/3 : 2/3
    const f = screen.width > lg ? .125 : .125

    watch(()=>currentPosition.value.y,
          () => {
            backgroundRGBA.value = colorHelper.interpolateColour({r:26,g:198,b:238,a:.9},{r:255,g:26,b:178,a:.9}, currentPosition.value.y / screen.height)
          }
    )

    const emit = defineEmits<{
        (e: "click-cube"): void;
    }>()

    function toPxT(y: number): number {
        if (y === 0) return screen.height * a;
        return  y < 0 ? 
            screen.height * a + screen.height * b * -y : 
            screen.height * a - screen.height * c * y
    }

    function toPxL(x: number): number{
        if (x === 0) return screen.width * d * a;
        return  x < 0 ? 
            screen.width * e * a + screen.width * d * f * -x : 
            screen.width * e * a + screen.width * e * c * x
    }

    const { onLoop } = useRenderLoop();

    onLoop(({ delta, elapsed }) => {

        if (!cubeRef.value) return;

        cubeRef.value.rotation.y = delta;
        cubeRef.value.rotation.z = elapsed * 1;
        cubeRef.value.position.y = Math.sin(elapsed) * 2;
        cubeRef.value.position.x = Math.sin(Math.sin(elapsed)) * 1;
        currentPosition.value.x = toPxL(cubeRef.value.position.x)
        currentPosition.value.y = toPxT(cubeRef.value.position.y)
        if (clickCounter.value % 2 == 0) {
            
            cubeRef.value.scale.set(
                Math.sin(elapsed) * Math.cos(elapsed) * 2,
                Math.sin(elapsed) * Math.cos(elapsed) * 2,
                Math.sin(elapsed) * Math.cos(elapsed) * 2
            );

        } else {
            cubeRef.value.scale.set(
                Math.sin(elapsed) - Math.cos(elapsed) * 2,
                Math.sin(elapsed) * Math.cos(elapsed) * 2 == 0 ? Math.sin(elapsed) - Math.cos(elapsed) * 2 : Math.sin(elapsed) + Math.cos(elapsed) * 2,
                Math.sin(elapsed) + Math.cos(elapsed) * 2 == 0 ? Math.sin(elapsed) + Math.cos(elapsed) * 2 : Math.sin(elapsed) * Math.cos(elapsed) * 2,
            );
        }
    });

    onMounted(async() => {
        // await new Promise(resolve => setTimeout(resolve, 100));
        cubeWrapper.value = document.getElementById("cube-wrapper");
        showAnimation.value = true;
        isLoading.value = false;
    });

    function gotcha(): void{

        if(!cubeWrapper.value) return;
        clickCounter.value++;
        textBubbleContent.value = randomText.getRandomFunnyChatMessage();
        emit("click-cube");
    }
    
</script>

<template>
    <div class="w-full h-full relative cursor-pointer" id="cube-wrapper" data-testid="cube-wrapper" >
        <TresCanvas>
            <TresPerspectiveCamera/>
            <OrbitControls />
            <TresMesh
                ref="cubeRef"
                @click="gotcha">
                <TresBoxGeometry :args="[.5, .5, .5]"/>
                <TresMeshNormalMaterial />
            </TresMesh>
            <TresDirectionalLight :position="[-1, 2, 4]" />
        </TresCanvas>
        <FloatingBubble :position="currentPosition" :content="textBubbleContent" :backgroundRGBA="backgroundRGBA"></FloatingBubble>
    </div>
</template>

<style scoped>
</style>