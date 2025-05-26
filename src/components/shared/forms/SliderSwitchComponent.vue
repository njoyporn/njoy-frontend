<script setup lang="ts">
    import { ref, onMounted, watch } from "vue";

    const props = defineProps<{
        input:boolean;
        text?:string;
        round?:boolean;
    }>()

    const emit = defineEmits<{
        (e: 'update:input', input: boolean): void
    }>();

    const input = ref<boolean>(false)

    onMounted(() => {
      input.value = props.input
    })

    watch(()=>props.input, ()=>{
      input.value = props.input
    })

    watch(() => input.value, ()=>{
        emit('update:input', input.value);
    });

</script>

<template>
    <div class="">
        <label class="relative inline-block w-[54px] h-[24px]">
        <input class="opacity-0 w-0 h-0" type="checkbox" v-model="input">
        <span class="slider" :class="{'round':round}">
        <span class="relative left-24 text-xl text-nowrap" v-text="text"></span>

        </span>
        </label>
    </div>
</template>

<style scoped>
/* The switch - the box around the slider */
/* .switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
} */

/* Hide default HTML checkbox */
/* .switch input {
  opacity: 0;
  width: 0;
  height: 0;
} */

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 22px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 28px;
}
.slider.round:before {
  border-radius: 50%;
}
</style>