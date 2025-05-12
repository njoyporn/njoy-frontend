import { Observable } from "rxjs";
import { Subject } from "rxjs";

export type ALLOWED_CONTENT_TYPE = "application/json" | "multipart/form-data"

export interface UploadResponse<T = any> {
    abortController: AbortController;
    progress: Observable<number>;
    httpResponse: Promise<T>;
}

export interface APINotification {
    success?:string;
    error?:string;
}

export interface NotificationMessage {
    message: string;
    severity: "SUCCESS" | "WARNING" | "ERROR";
    details?: string;
}

export interface ClientRequestConfig {
    contentType?: ALLOWED_CONTENT_TYPE
    body?: any;
    needsAuthorization?: boolean;
    noLingeringCalls?: boolean;
    abortController?: AbortController;
    progressSubject?: Subject<number>;
}