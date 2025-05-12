import { SocketAPI } from "@/api/socket/socket.api";
import type { Connection } from "@/types/socket.type";
import type { Message, User } from "@/types/chat.type";

export class ChatService {

    private static _instance: ChatService;
    private constructor(){}
    private socketAPI: SocketAPI = new SocketAPI();

    public static _getInstance(): ChatService {
        if(!ChatService._instance){
            ChatService._instance = new ChatService();
        }
        return ChatService._instance;
    }

    //Move to fixtures for testing ;)
    public mockConnection(): Connection {
        return {
            socketId: "",
            user: {uid:"", rusername: "" },
            confirmed: false
        }
    }

    public getIntroMessage(): Message {
        return {
            uid: "service",
            msg: "Hey, I am Gilltricks assistant. You can leave a message for gilltrick by starting your message with @gilltrick",
            rusername: "GilltrickAI",
            date: new Date(),
            socketId: "service"
        }
    }

    public mockChatUser(): User {
        return {
            uid:"",
            rusername:""
        }
    }

    public run(){
        this.socketAPI.run();
    }

    public emit(event: string, message?: string): void{
        this.socketAPI.emit(event, message)
    }

    public getConnection(): Connection {
        return this.socketAPI.connection.value;
    }

    public getConnections(): Connection[] {
        return this.socketAPI.connections.value;
    }

    public getChatUser(): User {
        return this.socketAPI.chatUser.value;
    }

    public getChatUserList(): User[] {
        const users: User[] = this.socketAPI.chatUserList.value;
        return users;
    }

    public getMessages(): Message[] {
        return this.socketAPI.messages.value;
    }

    public updateMessageList(msg: Message): Message[] {
        this.socketAPI.messages.value.push(msg)
        return this.socketAPI.messages.value;
    }
}