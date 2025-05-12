import type { RegisterDTO } from "@/types/account.type";
import { HttpClient } from "../http/httpClient";
import type { BusinessResponse } from "@/types/core.types";

export abstract class AccountsAPI {

    private static readonly LOGIN_API_PATH: string = "/login";
    private static readonly REGISTER_API_PATH: string = "/register";
    private static readonly LOGOUT_API_PATH: string = "/logout";
    private static readonly BASE_URL: string = window.location.host.includes("localhost") ? "http://localhost:6692/api/v1" : "https://api.njoyporn.com/api/v1";
    // private static readonly BASE_URL: string = "https://api.njoyporn.com/api/v1";

    public static async loginAccount(username: string, password: string): Promise<boolean>{
        const res: BusinessResponse<any> = await HttpClient.post<BusinessResponse<any>>(`${AccountsAPI.BASE_URL}${AccountsAPI.LOGIN_API_PATH}`, {username, password}, false, "application/json");
        // const res: any = await HttpClient.post(`https://api.njoyporn.com/api/v1${AccountsAPI.LOGIN_API_PATH}`, {username, password}, false, "application/json");
        if(res.message === 'login-success'){
            return true;
        }
        return false;
    }

    public static async verify(): Promise<boolean> {
        let res: BusinessResponse<any> = await HttpClient.get<BusinessResponse<any>>(`${AccountsAPI.BASE_URL}${AccountsAPI.LOGIN_API_PATH}`);
        if(res.message === 'authorized'){
            return true;
        }
        return false;
    }

    public static async verifyRole(role: string): Promise<boolean> {
        let res: BusinessResponse<any> = await HttpClient.get<BusinessResponse<any>>(`${AccountsAPI.BASE_URL}${AccountsAPI.LOGIN_API_PATH}`);
        if(res.message === 'authorized'){
            return res.items[0].name === role;
        } return false;
    }

    public static async register(account: RegisterDTO): Promise<BusinessResponse<any>> {
        return await HttpClient.post<BusinessResponse<any>>(`${AccountsAPI.BASE_URL}${AccountsAPI.REGISTER_API_PATH}`, account, false, "application/json");
        // let res: BusinessResponse<any> = await HttpClient.post<BusinessResponse<any>>(`${AccountsAPI.BASE_URL}${AccountsAPI.REGISTER_API_PATH}`, account, false, "application/json");
        // if(res.message == 'account-created') return true;
        // return false;
    }

    public static async logout(): Promise<void> {
        await HttpClient.get(`${AccountsAPI.BASE_URL}${AccountsAPI.LOGOUT_API_PATH}`);
        document.location.href = "https://google.com";
    }
}