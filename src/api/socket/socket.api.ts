import { io } from "socket.io-client";
import type { Connection } from "@/types/socket.type";
import type { Message, User } from "@/types/chat.type.ts";
import { ref } from "vue";

export class SocketAPI{
 
  private readonly BASE_URL: string = window.location.host.includes("localhost") ? "http://localhost:8086" : "https://chat.gilltrick.com";
  public connection = ref<Connection>({
    socketId: "",
    user: {uid:"", rusername: "" },
    confirmed: false
  });
  public connections = ref<Connection[]>([]);
  private socket: any =  io(this.BASE_URL);
  public messages = ref<Message[]>([])
  public chatUser = ref<User>(this.connection.value.user);
  public chatUserList = ref<User[]>([])
  
  constructor(){}

  emit(event: string, message?: string): void {
    if (message) {
      this.socket.emit(event, message);
      // console.log(event, message)
      return;
    } else {
      this.socket.emit(event)
      // console.log(event)
    }
  }

  run(): void{
    this.socket.on("connected", () => {
      // this.state.value.connected = true;
      
      console.log("CONNECTED")
      //this.state.value.online = true;
    });
    
    this.socket.on("user_disconnected", (socketId: string) => {
      const connection:  Connection | undefined = this.connections.value.find((connection) => connection.socketId == socketId);
      if(!connection) return;
      const uid: string = connection.user.uid;
      this.connections.value = this.connections.value.filter((connection) => connection.socketId != socketId)
      this.chatUserList.value = this.chatUserList.value.filter((chatUser) => chatUser.uid != uid)
    });
    
    this.socket.on("chat-message", (msg: any) => {
      console.log("msg", msg)
        this.messages.value.push(JSON.parse(msg) as Message)
    });
    
    this.socket.on("user_connected", (msg: any) => {
      if(this.chatUser.value.uid === ""){
        const connections: Connection[] = JSON.parse(msg);
        this.connection.value = connections[connections.length - 1];
        this.chatUser.value = this.connection.value.user;
        this.connections.value = connections;
        this.connections.value.forEach((connection) => { this.chatUserList.value.push(connection.user) })
      } else {
        const connections: Connection[] = JSON.parse(msg);
        this.connections.value = connections;
        this.chatUserList.value = [];
        this.connections.value.forEach((connection) =>  this.chatUserList.value.push(connection.user))
      }
    });

    this.socket.on("server-confirm", () => {
        this.connection.value.confirmed = true;
    });
  }
}