<script setup lang="ts">
    import { onMounted, watch, ref } from 'vue';
    import { resolveIconSrc } from "@/components/shared/utils/images.utils";
    
    const props = defineProps<{
        input: string;
        options?: {title:boolean, description: boolean, categories: boolean};
        hideOptions?: boolean
        wrapperClasses?: string;
        inputClasses?: string;
        enabled?: boolean;
        animationText?: {text: string, delay: number; cps: number, out: number}
    }>();

    onMounted(async ()=>{
        if(props.animationText) {
            await anmiateSerachInput();
        }
    })

    const emit = defineEmits<{
        (e: "update:input", input: string,
            options: {title:boolean, description: boolean, categories: boolean}
        ): void;
        (e: "confirm"): void;
        (e: "onHover"): void
    }>()

    const input = ref<string>("")
    const showOptions = ref<boolean>(false);
    const options = ref<{title:boolean, description: boolean, categories: boolean}>({title:true, description:true, categories:false})

    watch(()=>input.value,()=>{
        emit("update:input", input.value, options.value);
    })

    function confirm(): void {
        emit('confirm');
        input.value = "";
    }

    function onHover(): void {
        emit('onHover');
        if(!options) return;
        showOptions.value = true;
    }

    function onmouseout(): void {
        let timeOut:NodeJS.Timeout | null = null;
        if(!timeOut){
            timeOut = setTimeout(()=>{
                showOptions.value = false;
            }, 500)
        } else {
            clearTimeout(timeOut);
            onmouseout();
        }
    }

    async function anmiateSerachInput(): Promise<void> {
        if(!props.animationText) return;
        const temp: {text: string, delay: number, cps: number, out: number} = props.animationText;
        const charArr = [...temp.text]
        await new Promise(resolve => setTimeout(resolve, temp.delay));
        for(let i = 0; i < charArr.length; i++){
            input.value += charArr[i];
            await new Promise(resolve => setTimeout(resolve, 1000 / temp.cps));
        }
        await new Promise(resolve => setTimeout(resolve, temp.out));
        input.value = "";
    }

</script>

<template>
    <div class="h-full w-full flex justify-center items-center px-16 relative" :class="wrapperClasses">
        <input class="h-14 w-1/2 bg-gray-700 border-2 font-medium text-white rounded-full px-4 transition-all duration-300 ease-out focus:w-2/3 shadow-sm shadow-sky-600" :class="inputClasses" id="search" :placeholder="'Enter search...'" v-model="input" @keydown.enter="confirm()" @mouseover="onHover()" :readonly="!enabled"/>
        <img class="relative top-0 right-16 h-8" :src="resolveIconSrc('magnification_class.svg')" @click="confirm()"/>
        <div v-if="options && showOptions && !hideOptions" class="w-1/4 absolute top-20 flex" @mouseleave="onmouseout()">
            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:bg-opacity-50 dark:text-white">
                <li v-for="(option,i) of Object.keys(options)" :key="i" class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                        <input id="vue-checkbox-list" type="checkbox" value="" class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300" :checked="option">{{ option }}</label>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
</style>