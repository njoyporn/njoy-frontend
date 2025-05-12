import type { Timestamp } from "@/types/video.type";

export class TimestampService {
    
    static _instance: TimestampService;
    static readonly storageKey: string = "Timestamps";
    timestamps: Timestamp[] = [];


    private constructor() {this.loadTimestamps();}

    public static _getInstance(): TimestampService {
        if(!TimestampService._instance) TimestampService._instance = new TimestampService();
        return TimestampService._instance;
    } 

    private loadTimestamps(): void {
        const res: string | null = localStorage.getItem(TimestampService.storageKey);
        if (!res) return;
        this.timestamps = JSON.parse(res);
    }

    public saveTimeStamp(timestamp: Timestamp): void {
        timestamp.ts = Math.floor(timestamp.ts);
        this.timestamps.push(timestamp)
        localStorage.setItem(TimestampService.storageKey, JSON.stringify(this.timestamps));
    }

    public find(videoId: string): Timestamp[] | null{
        const timestamps: Timestamp[] | undefined= this.timestamps.filter((ts) => ts.videoId == videoId)
        if (!timestamps) return null;
        return timestamps;
    }
}