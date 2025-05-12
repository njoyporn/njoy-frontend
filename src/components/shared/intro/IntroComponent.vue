<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";
    import { IntroService } from "./intro.service";
    import { ColorHelper } from "../utils/color.helper";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const introService: IntroService = new IntroService();
    const isInitialized = ref<boolean>(false);
    const colorHelper: ColorHelper = new ColorHelper();
    const cmdInput = ref<string>("");
    const showInput = ref<boolean>(false)
    const showSkipBtn = ref<boolean>(false)

    onMounted(()=>{
        let count: number = 0;
        let loadingTime: number = 100; //100ms
        startSkipBtnDelay()
        while(count < loadingTime){
            colorHelper.interpolateColour({r: 32, g: 32, b: 32, a: 1}, {r: 8, g: 47, b: 73, a: 1}, count);
            count++;
        }
        isInitialized.value = true;
        introService.playIntro();
        document.onkeydown = keyCombi;
    })

    watch(()=>introService.state.value.isRunning, ()=>{
        if(!introService.state.value.isRunning && !introService.state.value.aborted) {
            emit("animation-done", {skip:false})
        };
        if(introService.state.value.aborted){
            showInput.value = true;
        }
    })

    async function startSkipBtnDelay(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
        showSkipBtn.value = true;
    }

    function keyCombi(e: any): void {
        if(e.keyCode == 16){
            introService.state.value.aborted = true;
        }
    }

    const emit = defineEmits<{
        (e: "animation-done", options:any): void
    }>()

    function execute(){
        if(cmdInput.value === "code ."){
            router.push("/ide/new-file")
        }
        if(cmdInput.value === "clear" || cmdInput.value === "cls"){
            emit("animation-done",{skip:false});
        }
    }
</script>

<template>
    <div class="w-full h-full">
        <button v-if="showSkipBtn" class="lg:right-32 lg:top-24 lg:text-4xl
                    right-4 top-4 text-xl absolute bg-slate-800 bg-opacity-50 text-center text-sky-500 p-4 border rounded-xl" @click="emit('animation-done', {skip:false})">Skip Intro</button>
        <div v-if="!isInitialized" class="h-screen w-screen"></div>
        <div v-else class="h-screen w-screen bg-gray-900 text-sky-500">
            <div class="w-full lg:w-2/3 h-auto p-2 lg:p-40" style="font-weight: 700;">
                <div v-for="(fragment, i) of introService.fragments.value" :key="i" v-html="fragment"></div>
                <div class="flex" v-if="showInput">
                    <p style="font-family: Ubuntu-B">gilltrick@archlinux/gilltrick.DE:$ </p>
                    <input class="font-semibold border-transparent bg-transparent outline-none pl-2" v-model="cmdInput" autofocus @keydown.enter="execute"/>
                </div>
            </div>

        </div>
        
    </div>
</template>

<style scoped>
</style>