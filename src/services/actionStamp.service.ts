import type { ActionStamp } from "@/types/video.type";

export class ActionStampService {
    
    static _instance: ActionStampService;
    static readonly storageKey: string = "ActionStamp";
    actionStamps: ActionStamp[] = [];


    private constructor() {this.loadActionStamps();}

    public static _getInstance(): ActionStampService {
        if(!ActionStampService._instance) ActionStampService._instance = new ActionStampService();
        return ActionStampService._instance;
    } 

    private loadActionStamps(): void {
        const res: string | null = localStorage.getItem(ActionStampService.storageKey);
        if (!res) return;
        this.actionStamps = JSON.parse(res);
    }

    public saveActionStamps(actionStamp: ActionStamp): void {
        actionStamp.ts = Math.floor(actionStamp.ts);
        // I need this to decouple the actionStamp from the ref
        this.actionStamps.push(JSON.parse(JSON.stringify(actionStamp)))
        localStorage.setItem(ActionStampService.storageKey, JSON.stringify(this.actionStamps));
    }

    public find(videoId: string): ActionStamp[] | null{
        const actionStamp: ActionStamp[] | undefined= this.actionStamps.filter((aS) => aS.videoId == videoId)
        if (!actionStamp) return null;
        return actionStamp;
    }

    public deleteActionStamp(actionStamp: ActionStamp): void {
        this.actionStamps = this.actionStamps.filter((aS) => aS.ts != actionStamp.ts);
        console.log(this.actionStamps)
        localStorage.setItem(ActionStampService.storageKey, JSON.stringify(this.actionStamps));
    }

    public exportAsString(): string {
        return JSON.stringify(this.actionStamps);
    }
}