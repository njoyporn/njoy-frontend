import type { RegisterDTO } from "@/types/account.type";
import { HttpClient } from "../http/httpClient";
import type { BusinessResponse } from "@/types/core.types";

export abstract class AccountsAPI {

    private static readonly HOST_URL: string = "https://api.njoyporn.com";
    private static readonly API_PATH: string = "/api/v1";
    private static readonly ACCOUNT_SERVICE_PATH: string = "/account-service"
    private static readonly LOGIN_API_PATH: string = "/login";
    private static readonly REGISTER_API_PATH: string = "/register";
    private static readonly LOGOUT_API_PATH: string = "/logout";
    private static readonly BASE_URL: string = window.location.host.includes("localhost") ? `http://localhost:6692${this.API_PATH}` : `${this.HOST_URL}${this.API_PATH}`;
    // private static readonly BASE_URL: string = "https://api.njoyporn.com/api/v1";

    public static async loginAccount(username: string, password: string): Promise<boolean>{
        const res: BusinessResponse<any> = await HttpClient.post<BusinessResponse<any>>(`${this.HOST_URL}${this.ACCOUNT_SERVICE_PATH}${this.API_PATH}${this.LOGIN_API_PATH}`, {username, password}, false, "application/json");
        if(res.message === 'login-success'){
            if(!res.token) return false; 
            localStorage.setItem(HttpClient.tokenStorageKey, res.token);
            return true;
        } return false;
    }

    public static async verify(): Promise<boolean> {
        let res: BusinessResponse<any> = await HttpClient.get<BusinessResponse<any>>(`${this.HOST_URL}${this.ACCOUNT_SERVICE_PATH}${this.API_PATH}${this.LOGIN_API_PATH}`);
        if(res.message === 'authorized'){
            return true;
        } return false;
    }

    public static async verifyRole(role: string): Promise<boolean> {
        let res: BusinessResponse<any> = await HttpClient.get<BusinessResponse<any>>(`${this.HOST_URL}${this.ACCOUNT_SERVICE_PATH}${this.API_PATH}${this.LOGIN_API_PATH}`, false, "application/json", true);
        if(res.message === 'authorized'){
            return res.items[0].name === role;
        } return false;
    }

    public static async register(account: RegisterDTO): Promise<BusinessResponse<any>> {
        return await HttpClient.post<BusinessResponse<any>>(`${this.HOST_URL}${this.ACCOUNT_SERVICE_PATH}${this.API_PATH}${this.REGISTER_API_PATH}`, account, false, "application/json");
    }

    public static async logout(): Promise<void> {
        await HttpClient.get(`${this.HOST_URL}${this.ACCOUNT_SERVICE_PATH}${this.API_PATH}${this.LOGOUT_API_PATH}`);
        localStorage.clear();
        document.location.href = "https://google.com";
    }
}