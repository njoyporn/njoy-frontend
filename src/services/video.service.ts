import type { CreateVideoRequestDTO, Video } from "@/types/video.type";

export class VideoService {
    
    static _instance: VideoService;

    private constructor(){}

    _getInstance(): VideoService {
        if(!VideoService._instance) VideoService._instance = new VideoService();
        return VideoService._instance;
    }

    static emptyVideo(): Video {
        return {
            id: "",
            filename: "",
            title: "",
            description: "",
            duration: 0,
            categories: [],
            sub_categories: [],
            happy_ends: [],
            timestamps: [],
            action_stamps: [],
            tags: [],
            likes: 0,
            dislikes: 0,
            views: 0,
            visibil: true,
            visibility: [],
            type: "",
            rules: [],
            flags: [],
            owner_id: "",
            url: "",
            thumbnail_url: "",
            created_at: new Date(),
            updated_at: new Date()
        }
    }

    static emptyCreateVideRequestDTO(): CreateVideoRequestDTO {
        return {
            file: null,
            filename: "",
            title: "",
            description: "",
            categories: [""],
            sub_categories: [""],
            tags: ["njoy"],
            happy_ends: [""],
            visibility: [""],
            public: true,
            free: true,
            trailer: false,
            timestamps: ""
        }
    }
}