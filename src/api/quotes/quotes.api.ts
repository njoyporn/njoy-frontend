import { HttpClient } from "../http/httpClient";
import type { Quote } from "@/types/quote.type";

export class QuoteAPI {

    private static readonly RANDOM_QUOTE_API_PATH: string = "/api/v1/quote";
    private static readonly BASE_URL: string = window.location.host.includes("localhost") ? "https://quotes.gilltrick.com" : "https://quotes.gilltrick.com";

    public static async getRandomQuote(): Promise<Quote | null>{

        const result: Quote | null = await HttpClient.get(`${QuoteAPI.BASE_URL}${QuoteAPI.RANDOM_QUOTE_API_PATH}`, false, "application/json");
        if(!result) return null;
        return result;
    }
}