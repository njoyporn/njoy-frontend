import {cmds} from "./cmds";
import { HTMLFragmenttoString, type HTMLFragment } from "./htmlFragments"
import type { HTMLTag } from "./htmlFragments"
import { ref } from "vue";


export class IntroService {
    
    public state = ref<IntroState>({
        isRunning: false
    });
    private htmlFragments: HTMLFragment[] = []
    public fragments = ref<string[]>([]);

    constructor(){}

    async playIntro(): Promise<void>{
        this.state.value.isRunning = true;
        for(let i = 0; i < cmds.length; i++){
            if(cmds[i].cmd != "skip"){
                let start: number = new Date().getTime();
                this.createIntroMessage(cmds[i]);
                await new Promise(resolve => setTimeout(resolve, cmds[i].typeDelay));
                await this.animateIntroMessage(cmds[i])
                await new Promise(resolve => setTimeout(resolve, cmds[i].totalTime - (new Date().getTime() - start)));
                this.executeCommand(cmds[i].cmd)
            }
            if(this.state.value.aborted){
                this.state.value.isRunning = false;
                return;
            }
        }
        this.state.value.isRunning = false;
    }

    executeCommand(cmd: INTRO_CMD): void {
        switch(cmd){
            case "cls": this.fragments.value = [];
                        this.htmlFragments = [];
            case "none":
                default: return;    
        }
    }

    createIntroMessage(message: IntroMessage): void {
        const index: number = this.fragments.value.length;
        const htmlFragment: HTMLFragment = {
            id: index,
            tag: "div",
            staticContent: message.staticText,
            style: message.style,
            spanStyle: "font-family: Ubuntu-Th;",
            spanContent: ""
        }
        const fragment: string = HTMLFragmenttoString(htmlFragment)
        this.htmlFragments.push(htmlFragment)
        this.fragments.value.push(fragment);
    }
    
    async animateIntroMessage(message: IntroMessage): Promise<void>{
        const index: number = this.htmlFragments.length - 1;
        let keyStrokes: number = 0;
        if (message.ksps && message.typedText){
            while(keyStrokes < message.typedText?.length){
                await new Promise(resolve => setTimeout(resolve, (1/message.ksps! * 1000)));
                this.htmlFragments[index].spanContent += message.typedText!.split("")[keyStrokes];
                const fragment: string = HTMLFragmenttoString(this.htmlFragments[index]);
                this.fragments.value[index] = fragment;
                keyStrokes++;
            }
        }
        
    }
}

export interface IntroMessage  {
    style: string;
    staticText: string;
    totalTime: number;
    cmd: INTRO_CMD;
    typedText?: string;
    typeDelay?: number;
    ksps?: number; //keystrokes^-1s
}

export interface IntroState {
    isRunning: boolean;
    aborted?: boolean
}

export type INTRO_CMD = "skip" | "cls" | "restart" | "none"