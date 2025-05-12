import type { Video } from "@/types/video.type";

export class RTAService {

    static _instance: RTAService;
    static storageKey: string = "rta";
    static favourites: Video[] = [];
    public favs: Video[] = [];

    private constructor() {}

    public static _getInstance(): RTAService {
        if(!RTAService._instance) RTAService._instance = new RTAService();
        return RTAService._instance;
    }

    public static save(): void {
        localStorage.setItem(RTAService.storageKey, "true")
    }

    public static load(): boolean {
        return !!localStorage.getItem(RTAService.storageKey);
    }
}