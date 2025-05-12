import { ref } from "vue";

export class AnimatorService {

    public state = ref<AnimatorState>({
        isRunning: false
    });

    constructor(){}

    public content = ref<string>("")

    async playAnimation(animation: TextAnimation): Promise<void> {
        this.state.value.isRunning = true;
        let start = new Date().getTime();
        let keyStrokes = 0;

        while (keyStrokes < animation.from.content.length){
            await new Promise(resolve => setTimeout(resolve, (1/animation.from.ksps! * 1000)));
            this.content.value += animation.from.content[keyStrokes]
            keyStrokes++;
        }
        keyStrokes = 0;
        await new Promise(resolve => setTimeout(resolve, (animation.from.duration - (new Date().getTime() - start))))

        while (keyStrokes < animation.via.content.length){
            await new Promise(resolve => setTimeout(resolve, (1/animation.via.ksps! * 1000)));
            this.content.value += animation.via.content!.split("")[keyStrokes]
            keyStrokes++;
        }

        keyStrokes = 0;
        start = new Date().getTime();
        await new Promise(resolve => setTimeout(resolve, (animation.from.duration - (new Date().getTime() - start))))

        //clear if target is empty string
        if (animation.to.content == "") {
            while(this.content.value != ""){
                const chars: string[] = this.content.value.split("");
                chars.pop()
                this.content.value = "";
                chars.forEach((char) => {this.content.value += char})
                await new Promise(resolve => setTimeout(resolve, (1/animation.to.ksps! * 1000)))
            }
        }

        await new Promise(resolve => setTimeout(resolve, (animation.from.duration - (new Date().getTime() - start))))
        this.state.value.isRunning = false;
    }

}

export interface AnimatorState {
    isRunning: boolean;
}

export interface TextAnimation {

    from: {
        ksps: number;
        delay: number; //ms
        duration: number; //ms
        content: string;
        direction: AnimationDirection;
    }
    via: {
        ksps: number
        delay: number; //ms
        duration: number; //ms
        content: string;
    }
    to: {
        ksps: number
        delay: number; //ms
        duration: number; //ms
        content: string;
        direction: AnimationDirection;
    }

}

export type AnimationDirection = "FW" | "BW"