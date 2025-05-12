import type {NotificationMessage } from "@/types/api.type";
import { Observable, Subject } from "rxjs";

export class NotificationService {
    private static _instance: NotificationService;
    private notificationSubject: Subject<NotificationMessage> = new Subject();

    private constructor(){};
    public static _getInstance(): NotificationService {
        if(!NotificationService._instance) NotificationService._instance = new NotificationService();
        return NotificationService._instance;
    }

    public sendNotification(notification: NotificationMessage): void {
        this.notificationSubject.next(notification);
    }

    public getNotifications():Observable<NotificationMessage> {
        return this.notificationSubject.asObservable();
    }
}