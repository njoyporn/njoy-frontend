import type { Video } from "@/types/video.type";

export class FavouriteManager {

    static _instance: FavouriteManager;
    static storageKey: string = "favourites";
    static favourites: Video[] = [];
    public favs: Video[] = [];

    private constructor() {}

    public static _getInstance(): FavouriteManager {
        if(!FavouriteManager._instance) FavouriteManager._instance = new FavouriteManager();
        return FavouriteManager._instance;
    }

    private static saveFavourites(): void {
        const saveString = btoa(JSON.stringify(FavouriteManager.favourites));
        localStorage.setItem(FavouriteManager.storageKey, saveString);
    }

    private static loadFavourites(): Video[] {
        const storageString: string | null = localStorage.getItem(FavouriteManager.storageKey);
        if(!storageString) return []
        const videos: Video[] = JSON.parse(atob(storageString))
        FavouriteManager.favourites = videos;
        return videos;
    }

    static addFavourite(favourite: Video): void {
        FavouriteManager.favourites.push(favourite);
        FavouriteManager.saveFavourites();
    }

    static isFavourite(id: string): boolean {
        return !!FavouriteManager.favourites.find((favourite) => favourite.id == id)
    }

    static removeFavourite(id: string): void {
        FavouriteManager.favourites = FavouriteManager.favourites.filter((favourite) => favourite.id != id);
        FavouriteManager.saveFavourites();
    }

    static getFavaourites(): Video[] {
        return FavouriteManager.loadFavourites()
    }
}