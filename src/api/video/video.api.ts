import { HttpClient } from "../http/httpClient";
import type { CreateVideoRequestDTO, Video } from "@/types/video.type";
import type { BusinessResponse, Paginated } from "@/types/core.types";


export abstract class VideoAPI {

    private static readonly HOST_URL: string = "https://api.njoyporn.com";
    private static readonly API_PATH: string = "/api/v1";
    private static readonly VIDEOS_PATH: string = "/videos";
    private static readonly VIDEO_PATH: string = "/video";
    private static readonly VIDEO_SERVICE_PATH: string = "/video-service";
    private static readonly SEARCH_PATH: string = "/search";
    private static readonly LIKE_VIDEO_PATH: string = "/like";
    private static readonly WATCHED_VIDEO_PATH: string = "/watched";
    // private static readonly BASE_URL: string = window.location.host.includes("localhost") ? `http://localhost:6692${this.API_PATH}` : `${this.HOST_URL}${this.API_PATH}`;
    private static readonly BASE_URL: string = `${this.HOST_URL}${this.API_PATH}`;

    static async upload(video: CreateVideoRequestDTO){
        //`${this.HOST_URL}${this.VIDEO_SERVICE_PATH}${this.API_PATH}${this.VIDEO_PATH}`
        //`${this.BASE_URL}${this.VIDEO_PATH}`
        const res: BusinessResponse<any> = await HttpClient.post(`${this.HOST_URL}${this.VIDEO_SERVICE_PATH}${this.API_PATH}${this.VIDEO_PATH}`, {
            title: video.title,
            description: video.description,
            categories:video.categories.join(","),
            sub_categories:video.sub_categories.join(","),
            tags:video.tags.join(","),
            visibility:video.visibility.join(","),
            happy_ends:video.happy_ends.join(","),
            timestamps:video.timestamps,
            videoFile:video.file,
            public:video.public,
            free:video.free,
            trailer:video.trailer
        }, false, "multipart/form-data", true)
        console.log(res);
        return res;
    }

    static async getVideo(id: string): Promise<Video | null> {
        const res: BusinessResponse<Video> = await HttpClient.get(`${this.BASE_URL}${this.VIDEO_PATH}?id=${id}`);
        if(res.items) return res.items[0]
        return null;
    }

    public static derifeFilterOptions(filter?: Record<string, string>[], options?: Record<string, string>[]): string{
        let filterOptions: string = "";
        let filterString: string = "?"; //categories, sub_categories, happy_ends, title, description
        let optionsString: string = options ? "&" :""; //page?, direction 

        if(!filter){
            return "";
        }
        
        filter.forEach((filter) =>{
            Object.keys(filter).forEach((key) => {
                if (filterString == "?") {
                    filterString += `${key}=${filter[key]}`
                } else filterString += `&${key}=${filter[key]}`
            })
        })

        if (options) {
            options.forEach((option) =>{
                Object.keys(option).forEach((key) => {
                    if (optionsString == "&") {
                        optionsString += `${key}=${option[key]}`
                    } else optionsString += `&${key}=${option[key]}`
                })
            })
        }
        return `${filterOptions}${filterString}${optionsString}`;
    }

    static async searchVideos(filter?: Record<string, string>[], options?: Record<string, string>[], pageString: string = ""): Promise<Paginated<Video>|null> {
        const filterOptions = VideoAPI.derifeFilterOptions(filter, options);
        const videos: Paginated<Video> | null =  await HttpClient.get(`${this.BASE_URL}${this.SEARCH_PATH}${filterOptions}${pageString}`);
        if (!videos) return null
        return videos
    }

    static async getRandomVideos(): Promise<Video[] | null> {
        const res: BusinessResponse<Video> | null = await HttpClient.get(`${this.BASE_URL}${this.VIDEOS_PATH}?random=whatever`)
        if(!res) return null
        return res.items;
    }

    static async getRecentVideos(): Promise<Video[] | null> {
        const res: BusinessResponse<Video> | null = await HttpClient.get(`${this.BASE_URL}${this.VIDEOS_PATH}?recent=whatever`)
        if(!res) return null
        return res.items;
    }

    static async getPrivateVideos(): Promise<Video[] | null> {
        const res: BusinessResponse<Video> | null = await HttpClient.get(`${this.BASE_URL}${this.VIDEOS_PATH}?private=whatever`);
        if (!res) return res;
        return res.items;
    }

    static async likeVideo(id: string): Promise<void> {
        await HttpClient.get(`${this.BASE_URL}${this.LIKE_VIDEO_PATH}?video_id=${id}&like=1`)
    }
    static async dislikeVideo(id: string): Promise<void> {
        await HttpClient.get(`${this.BASE_URL}${this.LIKE_VIDEO_PATH}?video_id=${id}&like=-1`)
    }
    static async increaseVideoWatchCounter(id: string): Promise<void> {
        await HttpClient.get(`${this.BASE_URL}${this.WATCHED_VIDEO_PATH}?video_id=${id}`)
    }
}