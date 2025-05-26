import type { Category, HappyEnd, SubCategory } from "./porn.types";

export interface Video {
    id: string;
    filename?: string;
    title: string;
    description: string;
    duration: number;
    categories: string[];
    sub_categories?: string[];
    happy_ends: string[];
    tags?: string[];
    likes: number;
    dislikes: number;
    views: number;
    visibil?: boolean;
    visibility?: string[];
    type?: string;
    rules?: string[];
    flags?: string[];
    owner_id?: string;
    url: string;
    thumbnail_url: string;
    // timestamps: number[];
    timestamps: Timestamp[];
    action_stamps: ActionStamp[]
    created_at?: Date;
    updated_at?: Date;
    sponsored_url?: string;
}

export interface CreateVideoRequestDTO {
    file:File|null;
    filename: string;
    title: string;
    description: string;
    categories: string[];
    sub_categories: string[];
    tags: string[];
    happy_ends: string[];
    visibility: string[];
    public: boolean;
    free: boolean;
    trailer: boolean;
    timestamps: string;
}

export interface Timestamp {
    ts: number;
    videoId?: string;
    name?: string;
    info?: string;
    acronym?: string;
    happy_end?: HappyEnd;
}

export interface ActionStamp extends Timestamp {
    category: Category[]
    sub_category?: SubCategory[]
}