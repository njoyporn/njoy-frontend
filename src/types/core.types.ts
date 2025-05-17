export interface BusinessResponse<T> {
    id: string;
    error: BusinessError | null;
    items: T[] 
    message: string;
    token?: string;
}

export interface BusinessError {
    id: string;
    error: string;
}

export interface Paginated<T> {
    business_response: BusinessResponse<T>;
    links: Links;
}

export interface Links {
    next: string;
    prev: string;
}