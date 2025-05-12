import type { User } from "./chat.type";

export interface SocketState {
    connected: boolean;
    online: boolean;
    fooEvents: any[];
    barEvents: any[];
    isRunning: boolean;
}


export interface Connection {
    socketId: string;
    user: User;
    confirmed: boolean
}