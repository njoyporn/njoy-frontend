import type { Category } from "@/types/category.type";
import { HttpClient } from "../http/httpClient";
import type { BusinessResponse } from "@/types/core.types";


export abstract class CategoryAPI {

    private static readonly HOST_URL: string = "https://api.njoyporn.com";
    private static readonly API_PATH: string = "/api/v1";
    private static readonly CATEGORIES_PATH: string = "/categories";
    private static readonly VIDEO_SERVICE_PATH: string = "/category-service";
    // private static readonly BASE_URL: string = window.location.host.includes("localhost") ? `http://localhost:6692${this.API_PATH}` : `${this.HOST_URL}${this.VIDEO_SERVICE_PATH}${this.API_PATH}`;

    private static readonly BASE_URL: string = `${this.HOST_URL}${this.VIDEO_SERVICE_PATH}${this.API_PATH}`;

    static async getCategories(): Promise<Category[] | null> {
        const res: BusinessResponse<Category> = await HttpClient.get(`${this.BASE_URL}${this.CATEGORIES_PATH}`);
        if(!res) return null
        return res.items;
    }

}