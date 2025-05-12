export interface Account {

    id: number;
    username:string;
}

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
    re_password: string;
}