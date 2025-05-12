<script setup lang="ts">
    import { ref, onMounted, watch } from "vue";

    const props = defineProps<{
        list:string[];
        inputPlaceholder?: string;
        preventCustomItems?: string;
    }>()

    const emit = defineEmits<{
        (e: "update:selection", selection: string[]): void;
    }>()


    let preventBlur = false;
    const showList = ref<boolean>(false);
    const input = ref<string>("");
    const shallowList = ref<string[]>([]);
    const workingList = ref<string[]>([]);
    const selection = ref<string[]>([]);

    onMounted(() => {
        shallowList.value = props.list;
        workingList.value = [...props.list];
        shallowList.value = sortList(shallowList.value);
        workingList.value = sortList(workingList.value);
    })

    watch(() => selection.value.length, () => {
        emit("update:selection", selection.value);
    })

    function selectInput(): void {
        showList.value = true;
    }

    function hideList(): void {
        setTimeout(()=>{
            if(!preventBlur) showList.value = false;
            preventBlur = false;
        }, 135)
    }

    function searchInList(): void {
        if(input.value == ""){
            shallowList.value = workingList.value;
            return;
        }
        const results: string[] = shallowList.value.filter((item) => item.includes(input.value));
        shallowList.value = results;
    }

    function selectItem(item: string): void {
        preventBlur = true;
        if (selection.value.includes(item)){
            selection.value = selection.value.filter((selectedItem) => selectedItem != item)
        } else selection.value.push(item);
    }

    function isSelected(item: string): boolean {
        return selection.value.includes(item);
    }

    function updateWorkingList(item: string): void {
        workingList.value.push(item);
        workingList.value = sortList(workingList.value);
        shallowList.value = workingList.value;
    }

    function sortList(list: string[]): string[] {
        return list.sort((x, y) => x.localeCompare(y));
    } 

    function enterCategory(): void {
        if(props.preventCustomItems) return;
        selectItem(input.value);
        updateWorkingList(input.value)
        showList.value = false
        input.value = '';
    }
</script>

<template>
    <div class="w-full h-full relative">
        <input class="h-16 w-full absolute top-0 left-0 z-10 bg-gray-600 border rounded-tl-md rounded-tr-md pl-4" 
            v-model="input" 
            @focus="selectInput()" 
            @blur="hideList()" 
            @input="searchInList()"
            @keyup.enter="enterCategory()"
            :placeholder="inputPlaceholder"
        />
        <button class="absolute right-4 -top-10 w-12 h-full z-20"><img :class="{'-rotate-180 transition-transform' : !showList}" src="/icons/u_arrow.svg" @click="showList = !showList"/></button>
        <div v-if="selection.length > 0" class="absolute top-16 left-0 h-16 w-full bg-gray-600 border rounded-bl-md rounded-br-md flex overflow-x-auto items-center pl-4 gap-2">
            <div class="border rounded-lg pt-1 pb-1 pl-4 pr-4 flex" v-for="(item, i) of selection" :key="i">
                {{ item }}
                <button class="border hover:border-2 hover:shadow-2xl rounded-full w-8 h-8 items-center justify-center bg-red-500       font-bold text-[1rem] relative -right-3 -top-0" @click="selectItem(item)">X</button>
            </div>
        </div>
        <div v-if="showList" class="absolute top-16 left-0 w-full max-h-60 overflow-y-auto bg-gray-600 z-30 border-2 rounded-bl-md rounded-br-md">
            <div v-for="(item, i) of shallowList"
                class="h-16 flex items-center pl-4"
                :key="i" 
                v-text="item" 
                @click="selectItem(item)"
                :class="{'bg-fuchsia-400' : isSelected(item), 'odd:bg-gray-600 even:bg-gray-500' : !isSelected(item)}"
            >
            </div>
        </div>
    </div>
</template>

<style scoped></style>