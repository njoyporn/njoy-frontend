export interface Card {
    name: string;
    imgSrc: string;
    price?:number;
    route?: string;
    id?: string;
    type?: CARD
}

export type CARD = "PRODUCT" | "INFO";