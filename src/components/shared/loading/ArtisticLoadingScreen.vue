<script setup lang="ts">

    const props = defineProps<{
        progress?: number;
        useRTA?: boolean;
    }>()

    const emit = defineEmits<{
        (e: "acceptRTA"): void;
    }>()
</script>

<template>
    <section class="z-50">
        <div class="loader">
            <span style="--i:1;"></span>
            <span style="--i:2;"></span>
            <span style="--i:3;"></span>
            <span style="--i:4;"></span>
            <span style="--i:5;"></span>
            <span style="--i:6;"></span>
            <span style="--i:7;"></span>
            <span style="--i:8;"></span>
            <span style="--i:9;"></span>
            <span style="--i:10;"></span>
            <span style="--i:11;"></span>
            <span style="--i:12;"></span>
            <span style="--i:13;"></span>
            <span style="--i:14;"></span>
            <span style="--i:15;"></span>
            <span style="--i:16;"></span>
            <span style="--i:17;"></span>
            <span style="--i:18;"></span>
            <span style="--i:19;"></span>
            <span style="--i:20;"></span>
            <div class="progress-box">
                <p v-if="progress" class="text">Loading: {{ progress }}%</p>
                <p v-if="useRTA">Confirm Age!</p>
            </div>
            <div v-if="useRTA" class="rta-box">
                <p class="text">Adoult Content: You are about to enter a website that contains explicit material (pornography). This website should only be accessed if you are at least 18 years old or of legal age to view such material in your local jurisdiction, whichever is greater. Furthermore, you represent and warrant that you will not allow any minor access to this site or services.
                    PARENTS, PLEASE BE ADVISED: If you are a parent, it is your responsibility to keep any age-restricted content from being displayed to your children or wards. Protect your children from adult content and block access to this site by using parental controls. We use the "Restricted To Adults" (RTA) website label to better enable parental filtering. Parental tools that are compatible with the RTA label will block access to this site.</p>
                <button class="button-play" @click="emit('acceptRTA')">I am over 18</button>
                <a class="leave-page" href="https://google.com">leave page</a>
            </div>
        </div>
    </section>
</template>

<style scoped>
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
}


section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: rgba(8,8,16,1);
    animation: animateBg 10s linear infinite;
}
@keyframes animateBg {
    0% {
        filter: hue-rotate(0deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
}
section .loader {
    position: relative;
    width: 120px;
    height: 120px;
}

section .loader span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(calc(18deg * var(--i)));
}

section .loader span::before {
    
    animation: animateScale 2s linear infinite;
    animation-delay: calc(0.1s * var(--i));
    transform: scale(0);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: rgba(244,16,166,1);
    box-shadow: 0 0 10px rgba(244,16,166,1),
                0 0 20px rgba(244,16,166,1),
                0 0 30px rgba(244,16,166,1),
                0 0 40px rgba(244,16,166,1),
                0 0 50px rgba(244,16,166,1),
                0 0 60px rgba(244,16,166,1);
    
}
@keyframes animateScale {
    0% {
        transform: scale(1);
        filter: hue-rotate(0deg);
    }
    80%, 100% {
        filter: hue-rotate(360deg);
        transform: scale(0);
    }
}

section .loader .progress-box {
    display: absolute;
    color: white;
    font-weight: 800;
    width: 100%;
    height: 100%;
}

.progress-box .text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

section .loader .rta-box {
    display: absolute;
    color: white;
    font-weight: 800;
    width: 200%;
    transform: translate(-25%, 50%);
    height: 130%;
    border: 1px solid white;
    border-radius: .25rem;
    padding: .5rem;
}

.rta-box .text {
    font-size: .875rem;
    text-align: justify;
    height: 65%;
    width: 100%;
    overflow-y: auto;
}

.rta-box button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;
    width: 100%;
    border: 2px solid white;
    border-radius: .25rem;
}

.rta-box .leave-page {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .875rem;
    width: 100%;
    height: 10%;
}

.button-play{
    background: linear-gradient(90deg, rgba(233, 25, 240, 0.85) 0%, rgba(241, 171, 230, 0.9) 60%);
    /* border: 0px solid white; */
    /* border-radius: 1rem; */
    color: #fff;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 20;
    box-shadow: 2px 3px 4px rgba(32, 32, 32, 0.9);

    cursor: pointer;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    min-height: 3rem;
    min-width: 8rem;
    /* width: 8rem; */
}

.button-play:before{
    content: "";
    /* border-radius: 1rem; */
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, rgb(240, 44, 240) 20%, rgb(238, 12, 181) 80%);
    transition: all .2s;
    z-index: -1;
}

.button-play:hover:before{
    width: 100%;
}
</style>