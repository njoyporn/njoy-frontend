<script setup lang="ts">
    import { onMounted, ref, useTemplateRef, watch } from "vue";
    import type { ActionStamp, Timestamp, Video } from '@/types/video.type';
    import { durationToTimeString } from '../utils/duration.utils';
    import { TimestampService } from "@/services/timestamp.service";
    import { NotificationService } from "../notification/notification.service";
    import ActionStampEditor from "./ActionStampEditor.vue";
import { ActionStampService } from "@/services/actionStamp.service";

    const props = defineProps<{
        video:Video;
    }>()

    const emit = defineEmits<{
        (e: "watched"): void;
        (e: "fullscreenEnabled"): void;
        (e: "fullscreenDisabled"): void;
        (e: "switchStarfieldOnOFF"): void;
    }>()

    const actionStampService: ActionStampService = ActionStampService._getInstance();
    const timestampService: TimestampService = TimestampService._getInstance();
    const notificationService: NotificationService = NotificationService._getInstance();
    const showDetails = ref<boolean>(false);
    const isFullScreen = ref<boolean>(false);
    const videoRef = useTemplateRef<HTMLVideoElement>("video-player")
    const currentVolumeElement = useTemplateRef<HTMLVideoElement>("current-volume")
    const progressBarElement = useTemplateRef<HTMLVideoElement>("progress-bar")
    const timestampButtonIsHidden = ref<boolean>(false);
    let videoOverlay: HTMLElement;
    let videoElement: HTMLVideoElement;
    let videoWidth: number = 0;
    let videoHeight: number = 0;
    const nextTimestamp = ref<Timestamp>({ts:0})
    const currentTimestampCounter = ref<number>(0);
    const showActionEditor = ref<boolean>(false);

    const isPaused = ref<boolean>(true);
    const isMuted = ref<boolean>(true);

    const duration = ref<number>(0);
    const currentTime = ref<number>(0);
    const resolutionFactor = ref<number>(1);

    const cumBarProgressElement = useTemplateRef<HTMLElement>("progress-cumbar")
    let timeout: any = null;

    onMounted(()=> {
        const player: HTMLVideoElement | null = document.getElementById("video-player") as HTMLVideoElement;
        const overlay: HTMLElement | null = document.getElementById("overlay");
        if (!player || !overlay !|| !videoRef || !currentVolumeElement) return;
        videoElement = player;
        videoOverlay = overlay;
        const videoBCR: DOMRect = videoElement.getBoundingClientRect();
        videoWidth = videoBCR.width;
        videoHeight = videoBCR.height;
        videoElement.volume = .5;
        videoOverlay.style.maxWidth = `${videoWidth}px`;
        videoOverlay.style.maxHeight = `${videoHeight}px`;
        duration.value = props.video.duration;
        document.addEventListener("keyup", keyPress);
        resolutionFactor.value = screen.width / 1920;
        loadTimestamps();
        loadActionStamps();
        loop();
    })

    function loop(): void {
        setTimeout(()=>{
            updateCumbar();
            updateProgressElement(videoElement.currentTime);
            currentTime.value = videoElement.currentTime;
            loop();
        }, 16)
    }

    function keyPress(e: KeyboardEvent): void {
        if(!document.location.pathname.includes('watch')) return;
        if(e.code) {
            switch(e.code){
                case "Space": playPause(); return;
                case "Escape": enableFullscreen(); return;
                default: break;
            }
        }
        switch(e.key) {
            case "w": increaseVolume(); return;
            case "s": decreaseVolume(); return;
            case "ArrowUp": increaseVolume(); return;
            case "ArrowDown": decreaseVolume(); return;
            case "a": skip(-5); return;
            case "d": skip(5); return;
            case "ArrowLeft": skip(-5); return;
            case "ArrowRight": skip(5); return;
            case "z": exportLocalTimestamps(); return;
            case "y": loadTimestamps(); return;
            case "t": saveTimestamp(); return;
            case "l": switchStarfieldOnOff(); return;
            case "u": showActionEditor.value = !showActionEditor.value; return;
            default: return;
        }
    }

    function deriveWatchURL(): string {
        // return `http://localhost:6692/api/v1/watch?id=${props.video.id}`
        return `https://api.njoyporn.com/api/v1/watch?id=${props.video.id}`;
    }

    function deriveThumbnailURL(): string {
        // return `http://localhost:6692/api/v1/image?id=${props.video.id}&iid=0`
        return `https://api.njoyporn.com/api/v1/image?id=${props.video.id}&iid=0`;
    }

    function playPause(): void {
        if(!videoElement) return;
        if(videoElement.paused) playVideo();
        else pauseVideo();
    }

    function playVideo(): void {
        if(!videoElement || !document.location.href.includes('/watch')) return;
        enableDetails(1250,1);
        if(videoElement.currentTime == 0) emit("watched");
        isPaused.value = false;
        videoElement.play();
    }
    function pauseVideo(): void {
        if(!videoElement) return;
        isPaused.value = true;
        videoElement.pause();
    }

    function switchStarfieldOnOff(): void {
        emit('switchStarfieldOnOFF');
    }

    function enableDetails(enabledForMS: number, disableDelay: number): void {
        showDetails.value = true;
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            disableDetails(disableDelay);
        }, enabledForMS);
    }

    function disableDetails(delay: number): void {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            showDetails.value = false;
        }, delay);
    }

    function setVolume(e: MouseEvent): void {
        const w: number = e.offsetX;
        const v: number = w / (isFullScreen.value ? 173 : 94) * resolutionFactor.value;
        videoElement.volume = v;
        updateVolumeElement();
    }

    function increaseVolume(): void {
        if(videoElement.muted) {
            unMuteVideo();
        }
        if(videoElement.volume < .975){
            videoElement.volume += .025;
        } else videoElement.volume = 1;
        updateVolumeElement();
    }

    function decreaseVolume(): void {
        if(videoElement.volume > .025){
            videoElement.volume -= .025;
        } else {
            videoElement.volume = 0;
            muteVideo();
        }
        updateVolumeElement();
    }

    function muteVideo(): void {
        isMuted.value = true;
        videoElement.muted = true;
    }
    function unMuteVideo(): void {
        isMuted.value = false;
        videoElement.muted = false;
    }

    function skip(seconds: number): void {
        if(!videoElement) return;
        videoElement.currentTime += seconds;
    }

    function udpateTimestampCounter(): void {
        for(let i = 0; i < props.video.timestamps.length; i++) {
            if(props.video.timestamps[i].ts > videoElement.currentTime){
                currentTimestampCounter.value = i;
                return;
            }
        }
    }

    function clearCumBar(): void {
        currentTimestampCounter.value = props.video.timestamps.length;
        nextTimestamp.value.ts = 0;
        if (!cumBarProgressElement.value) return;
        cumBarProgressElement.value.style.width = "0%";
    }

    function enableFullscreen(): void {
        if(!isFullScreen.value){
            emit("fullscreenEnabled");
            document.body.requestFullscreen();
            videoElement.height = window.screen.height;
            videoElement.width = window.screen.width;
            if (cumBarProgressElement.value) cumBarProgressElement.value.style.width = "100%";
            isFullScreen.value = true;
            return;
        } else {
            emit("fullscreenDisabled");
            document.exitFullscreen();
            videoElement.style.height = "100%";
            videoElement.style.width = "100%";
            isFullScreen.value = false;
        }
    }

    function updateVolumeElement(): void {
        if(!currentVolumeElement.value) return;
        currentVolumeElement.value.style.width = `${videoElement.volume * 100}%`;
    }

    function updateCumbar(): void {

        props.video.timestamps.sort((a,b) => a.ts - b.ts);
        const timestamp: Timestamp | undefined = props.video.timestamps.find((ts) => ts.ts > videoElement.currentTime);

        if(!timestamp) {
            clearCumBar();
            return;
        } else if (!cumBarProgressElement.value) return;

        nextTimestamp.value = timestamp;
        udpateTimestampCounter();
        const percentage = videoElement.currentTime / timestamp.ts;
        cumBarProgressElement.value.style.width = `${99 - (percentage * 99)}%`;
    }

    function updateProgressElement(nextDuration: number): void {
        if(!progressBarElement.value) return;
        progressBarElement.value.style.width = `${nextDuration / props.video.duration * 100}%`;
    }

    function setProgress(e: MouseEvent): void {
        const percentage: number = e.offsetX / (isFullScreen.value ? 1880 : 1112) * resolutionFactor.value;
        let nextDuration = props.video.duration * percentage;
        if (nextDuration <= 0) nextDuration = 0;
        else if (nextDuration >= props.video.duration) nextDuration = props.video.duration;
        videoElement.currentTime = nextDuration;
        updateProgressElement(nextDuration);
    }

    function findPreviousTimestamp(): number {
        const copy = [...props.video.timestamps];
        copy.reverse();
        const timestamp: Timestamp | undefined = copy.find((ts) => ts.ts < videoElement.currentTime)
        if (!timestamp) return 0;
        return timestamp.ts;
    }

    function jumpToTimestamp(direction: string): void {
        if(direction == "next") {
            if (nextTimestamp.value.ts != 0 && nextTimestamp.value.ts > videoElement.currentTime) {
                videoElement.currentTime = nextTimestamp.value.ts;
            }
        }
        else videoElement.currentTime = findPreviousTimestamp();
    }

    function jumpToActionStamp(actionStamp: ActionStamp): void {
        videoElement.currentTime = actionStamp.ts;
    }

    function saveTimestamp(): void {
        if(videoElement.currentTime > 0){
            timestampService.saveTimeStamp({videoId:props.video.id, ts: videoElement.currentTime});
            notificationService.sendNotification({severity: "SUCCESS", message:"Timestamp saved"});
        }
        loadTimestamps();
    }

    function loadTimestamps(): void {
        const ts: Timestamp[] | null = timestampService.find(props.video.id)
        if (!ts) return;
        ts.map((t) => props.video.timestamps.push(t))
        props.video.timestamps.sort((a,b) => a.ts - b.ts);
    }

    function loadActionStamps(): void {
        const aS: ActionStamp[] | null = actionStampService.find(props.video.id);
        if (!aS) return;
        aS.map((a) => props.video.action_stamps.push(a));
        props.video.action_stamps.sort((a, b) => a.ts - b.ts);
    }

    function exportLocalTimestamps(): void {
        const tsList = timestampService.find(props.video.id)?.map( ts => ts.ts)
        if(!tsList) return;
        //@ts-ignore //geht bei mir, das reicht :D
        alert(`Timestamps: ${JSON.stringify(tsList.join(",")).replaceAll("\"", "")}`)
    }

    function calcActionsStampXPosition(actionStamp: ActionStamp): string {
        // console.log(`${Math.floor(actionStamp.ts / props.video.duration * 100)}%`);
        return `${Math.floor(actionStamp.ts / props.video.duration * 100)}%`;
    }

    function addActionStamp(actionStamp: ActionStamp): void{
        loadActionStamps();
    }

</script>

<template>
    <div class="w-full h-full flex justify-center items-center relative" :class="{'w-screen h-screen': isFullScreen}">
        <div @mouseleave="disableDetails(1750)" id="overlay" class="absolute z-40 p-8 grid grid-rows-[1fr_2fr_1fr_1fr_1fr_4fr_1fr_1fr] bg-gray-500 bg-opacity-25 w-[100%] h-[97%]" :class="{'min-w-full min-h-full': isFullScreen, 'hidden':!showDetails}">
                    <div class="absolute z-50 flex justify-start flex-row-reverse" :class="{'w-[101%] pr-[10px] bottom-[18.25rem]' :isFullScreen, 'pr-[5.5px] w-[99.8%] bottom-[10.875rem]': !isFullScreen}">
            <div ref="action-bar" class="w-[99%] h-2 relative z-50">
                <div v-for="(actionStamp, i) of props.video.action_stamps" :key="i" class="absolute group" :class="`left-[${calcActionsStampXPosition(actionStamp)}]`" :style="`left:${calcActionsStampXPosition(actionStamp)};`" @click="jumpToActionStamp(actionStamp)">
                    <div class="h-2 w-2 bg-red-600"></div>
                    <span v-if="actionStamp.category" class="opacity-0 group-hover:opacity-100 absolute bottom-4" v-text="actionStamp.category.join(',')"></span>
                </div>
            </div>
        </div>
            <div class="grid grid-cols-[auto_8rem]" @click="playPause()"><h2 class="font-bold text-6xl flex items-center capitalize" v-text="video.title"></h2></div>
            <p class="text-3xl font-semibold flex items-start capitalize w-2/3" v-text="video.description"></p>
            <div class="w-full h-full flex flex-wrap gap-2" @click="playPause()">
                <div class="h-12 border rounded-md px-4 py-1 w-fit text-3xl font-semibold bg-fuchsia-400 bg-opacity-95 capitalize" v-for="(category, i) of video.categories" :key="i" v-text="category"></div>
            </div>
            <div class="w-full h-full flex flex-wrap gap-2" @click="playPause()">
                <div class="h-12 border rounded-md px-4 py-1 w-fit text-3xl font-semibold bg-gray-600 bg-opacity-95 capitalize" v-for="(sub_category, i) of video.sub_categories" :key="i" v-text="sub_category"></div>
            </div>
            <div class="w-full h-full flex flex-wrap gap-2" @click="playPause()">
                <div class="h-12 border rounded-md px-4 py-1 w-fit text-3xl font-semibold bg-orange-400 bg-opacity-95 capitalize" v-for="(happy_end, i) of video.happy_ends" :key="i" v-text="happy_end"></div></div>
            <div class=""></div>
            <div class="w-full h-8 relative">
                <div class="w-full h-full absolute z-50" @click="setProgress($event)"></div>
                <div class="bg-gray-500 bg-opacity-50 absolute top-3 w-full h-2"></div>
                <div class="bg-orange-400 bg-opacity-95 top-3 absolute h-2" ref="progress-bar"></div>
            </div>
            <div v-if="videoRef" class="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_2fr_8fr_auto_1fr_1rem_1fr_1fr] items-center gap-2">
                <button><img class="" src="/icons/backwards-arrow.svg" @click="jumpToTimestamp('prev')"/></button>
                <button><img class="w-full h-full" v-if="isPaused" src="/icons/play-animated.svg" @click="playVideo()"/><img class="w-full h-full" v-else src="/icons/pause-animated.svg" @click="pauseVideo()" /></button>
                <button><img class="" src="/icons/rewind-5sec.svg" @click="skip(-5)"/></button>
                <button><img class="" src="/icons/forward-5sec.svg" @click="skip(5)" /></button>
                <button><img class="" src="/icons/forward-arrow.svg" @click="jumpToTimestamp('next')" /></button>
                <button><img v-if="!isMuted" src="/icons/volume.svg" @click="muteVideo()"><img v-else src="/icons/muted.svg" @click="unMuteVideo()"></button>
                <div class="relative flex items-center">
                    <div class="w-full h-4 z-30" @click="setVolume($event)"></div>
                    <div ref="current-volume" class="absolute w-1/2 bg-gray-600 h-4 z-20"></div>
                    <div class="absolute w-full h-4 bg-gray-400 z-10"></div>
                </div>
                <div></div>
                <div class="flex group">
                    <button class="border-2 max-h-12 rounded-lg shadow-xl bg-fuchsia-400 opacity-90 px-2" @click="saveTimestamp()"><span class="px-1 font-bold text-3xl">+</span> timestamp</button>
                    <img v-if="timestampButtonIsHidden" class="h-12 w-12 opacity-0 group-hover:opacity-100" src="/icons/show.svg" @click="timestampButtonIsHidden = false">
                    <img v-else class="h-12 w-12 opacity-0 group-hover:opacity-100" src="/icons/hide.svg" @click="timestampButtonIsHidden = true">
                </div>
                <div class="bg-bar-dark-gradient w-full h-full flex justify-center items-center text-3xl font-semibold text-fuchsia-200" v-text="durationToTimeString(currentTime)"></div>
                <div class="bg-bar-dark-gradient w-full h-full flex justify-center items-center text-3xl font-semibold text-fuchsia-200">/</div>
                <div class="bg-bar-dark-gradient w-full h-full flex justify-center items-center text-3xl font-semibold text-fuchsia-200" v-text="durationToTimeString(duration)"></div>
                <button><img src="/icons/fullscreen.svg" @click="enableFullscreen()"></button>
            </div>
        </div>
        <button v-if="!timestampButtonIsHidden" class="absolute w-60 top-20 right-20 z-50 h-12 max-h-12 rounded-lg shadow-xl px-4 py-2 border flex text-wrap justify-center items-center bg-fuchsia-400 opacity-75" @click="saveTimestamp()"><span class="px-1 font-bold text-3xl">+</span> timestamp</button>
        <div class="absolute bottom-2 z-50 flex justify-start flex-row-reverse" :class="{'w-[101%] pr-[10px]' :isFullScreen, 'pr-[5.5px] w-[99.8%]': !isFullScreen}">
            <div ref="progress-cumbar" class="w-[99%] h-2 bg-pink absolute"></div>
        </div>

        <div v-if="video.timestamps.length > 0" class="absolute w-60 top-[9rem] right-20 z-50 h-12 max-h-12 rounded-lg shadow-xl border grid grid-cols-[2fr_1fr] items-center">
            <div class="w-full text-right pr-2 text-xl"> {{ nextTimestamp.happy_end }}</div>
            <div class="text-xl flex justify-center">{{ currentTimestampCounter }} / {{ video.timestamps.length }}</div>
        </div>
        <ActionStampEditor v-if="showActionEditor" :video="video" @action-stamp-created="addActionStamp($event)"></ActionStampEditor>
        <video id="video-player" class="absolute z-20 w-[100%] h-[100%] rounded-lg" ref="video-player" :src="deriveWatchURL()" :poster="deriveThumbnailURL()" muted @mouseenter="enableDetails(2750,1)" @click="playPause()" @mousemove="enableDetails(2150,1)"></video>
    </div>    
</template>

<style scoped>
    .rotate-cw {
        -webkit-animation:spin-cw 12s linear infinite;
        -moz-animation:spin-cw 12s linear infinite;
        animation:spin-cw 12s linear infinite;
    }

    .rotate-ccw {
        -webkit-animation:spin-ccw 12s linear infinite;
        -moz-animation:spin-ccw 12s linear infinite;
        animation:spin-ccw 12s linear infinite;
    }

    @-moz-keyframes spin-cw { 
        100% { -moz-transform: rotate(360deg); } 
    }
    @-webkit-keyframes spin-cw { 
        100% { -webkit-transform: rotate(360deg); } 
    }
    @keyframes spin-cw { 
        100% { 
            -webkit-transform: rotate(360deg); 
            transform:rotate(360deg); 
        } 
    }

    @-moz-keyframes spin-ccw { 
        100% { -moz-transform: rotate(-360deg); } 
    }
    @-webkit-keyframes spin-ccw { 
        100% { -webkit-transform: rotate(-360deg); } 
    }
    @keyframes spin-ccw { 
        100% { 
            -webkit-transform: rotate(-360deg); 
            transform:rotate(-360deg); 
        } 
    }
</style>