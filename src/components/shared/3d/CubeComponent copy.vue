<script setup lang="ts">
    import { TresCanvas, useRenderLoop } from '@tresjs/core'
    import { OrbitControls } from '@tresjs/cientos'
    import { shallowRef, ref, onMounted } from 'vue';
    import * as Three from 'three';


    const showAnimation = ref<boolean>();
    const cubeWrapper = ref<HTMLElement|null>();
    const cubeRef = shallowRef<Three.Mesh>();
    const positions = ref<{x:number,y:number}[]>([
        {
            x:460,
            y:-220
        },
        {
            x:220,
            y:80
        },
        {
            x:740,
            y:280
        }
    ]);

    const emit = defineEmits<{
        (e: "click-cube"): void;
    }>()

    const { onLoop } = useRenderLoop();

    onLoop(({ delta, elapsed }) => {

        if (!cubeRef.value) return;

        cubeRef.value.rotation.y = delta;
        cubeRef.value.rotation.z = elapsed * 1;
        cubeRef.value.position.y = Math.sin(elapsed) * 2;
        cubeRef.value.position.x = Math.sin(Math.sin(elapsed)) * cubeRef.value.position.y;

        cubeRef.value.scale.set(
            Math.sin(elapsed) * Math.cos(elapsed),
            Math.sin(elapsed) * Math.cos(elapsed),
            Math.sin(elapsed) * Math.cos(elapsed),
        );
        

    });

    onMounted(async() => {
        await new Promise(resolve => setTimeout(resolve, 100));
        cubeWrapper.value = document.getElementById("cube-wrapper");
        showAnimation.value = true;
    });

    function gotcha(): void{

        if(!cubeWrapper.value) return;
        emit("click-cube");
    }
</script>

<template>
    <div class="w-full h-full" id="cube-wrapper" data-testid="cube-wrapper" >
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
    </div>
</template>

<style scoped>
</style>