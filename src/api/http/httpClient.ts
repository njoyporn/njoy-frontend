import axios from "axios";
import type { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from "axios";
import type { ALLOWED_CONTENT_TYPE, ClientRequestConfig} from "./../../types/api.type";

export abstract class HttpClient {
   
    private static readonly errorMap: { [key: string]: string} = {
        "403": "Zugriff verweigert!",
        "500": "Interner Server Fehler",
        undefined: "Undefined"
    }
    private static readonly currentRequestMap: Map<string, AbortController> = new Map();

    public static get<T = any>(url: string, noLingering?: boolean, contentType?: ALLOWED_CONTENT_TYPE): Promise<T>{
        return HttpClient.httpCall(url, "get", {noLingeringCalls: noLingering, contentType})
    }

    public static post<T = any>(url: string, data: Object, noLingering?: boolean, contentType?: ALLOWED_CONTENT_TYPE): Promise<T>{
        return HttpClient.httpCall(url, "post", {body:data, noLingeringCalls:noLingering, contentType})
    }

    public static put<T = any>(url: string, data: Object, noLingering?: boolean, contentType?: ALLOWED_CONTENT_TYPE): Promise<T>{
        return HttpClient.httpCall(url, "put", {body:data, noLingeringCalls:noLingering, contentType});
    }

    public static del<T = any>(url: string, noLingering?: boolean, contentType?: ALLOWED_CONTENT_TYPE): Promise<T>{
        return HttpClient.httpCall(url, "delete", {noLingeringCalls:noLingering, contentType});
    }

    private static async httpCall(url: string, method: string, config: ClientRequestConfig): Promise<any>{
        if(config.noLingeringCalls && HttpClient.doesSameRequestStillRun(url, method)){
            HttpClient.abortRequest(url, method);
        }
        const controller: AbortController = HttpClient.trackCurrentRequest(url, method);
        let headers: HeadersInit;
        if (config.contentType){
            headers = { 
                "Content-Type": config.contentType,
                "Accept": "*/*"
            };
        } else {
            headers = { 
                "Content-Type": "application/json",
                "Accept": "*/*"
            };
        }
        if (config.needsAuthorization){
            headers.Authorization = `Bearer <GET_YOUR_TOKEN>`;
        }
        let requestConfig: AxiosRequestConfig = {
            url,
            method,
            headers,
            signal: controller.signal
        };
        if(config.body){
            requestConfig.data = config.body;
        }
        if(config.progressSubject){
            requestConfig.onUploadProgress = (event: AxiosProgressEvent) => {
                config.progressSubject!.next(event.progress!);
            }
        };

        let response: AxiosResponse<any>;
        try{
            response = await axios(requestConfig);
            HttpClient.untrackCurrentRequest(url, method);
        }
        catch (error: any) {
            if(error.statusCode === 403){
                setTimeout(()=>{
                    location.replace("/login");
                }, 1000);
            }
            // console.log(error?.statusCode, error?.status, error?.message);
            if(error?.statusCode){
                throw new Error(HttpClient.errorMap[`${error.statusCode}`]);
            }
            throw new Error("undefined");
        }

        return response.data;
    }

    private static createRequestMapKey(path: string, method: string): string {
        return `${method}:${path}`;
    }

    private static doesSameRequestStillRun(path: string, method: string): boolean {
        return HttpClient.currentRequestMap.has(HttpClient.createRequestMapKey(path, method));
    }

    private static trackCurrentRequest(path: string, method: string, existingContnroller?: AbortController): AbortController{
        const controller = (!existingContnroller) ? new AbortController() : existingContnroller;
        HttpClient.currentRequestMap.set(HttpClient.createRequestMapKey(path, method), controller);
        return controller;
    }

    private static untrackCurrentRequest(path: string, method: string){
        HttpClient.currentRequestMap.delete(HttpClient.createRequestMapKey(path, method));
    }

    private static abortRequest(path: string, method: string): void{
        const controller: AbortController | undefined = HttpClient.currentRequestMap.get(HttpClient.createRequestMapKey(path, method));
        if(controller){
            controller.abort();
            HttpClient.untrackCurrentRequest(path, method)
        }
    }
}