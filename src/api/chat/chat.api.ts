import type { RegisterDTO } from "@/types/account.type";
import { HttpClient } from "../http/httpClient";
import type { User } from "@/types/chat.type";

export class ChatAPI {

    private static readonly STATUS_API_PATH: string = "/status";
    private static readonly BASE_URL: string = window.location.host.includes("localhost") ? "http://localhost:8086" : "https://chat.gilltrick.com";

    public static async getUserList(): Promise<User[] | null>{

        const result: any = await HttpClient.get(`${ChatAPI.BASE_URL}${ChatAPI.STATUS_API_PATH}`, false, "application/json");
        if(!result) return null;
        return result.users;
    }
}