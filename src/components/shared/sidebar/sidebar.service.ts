import type { SidebarItem } from "./sidebar.type";

export class SidebarService {

    constructor(public items: SidebarItem[] = []){}

    public createDefaultItems(): SidebarItem[]{
        const items: SidebarItem[] = [
            {
                name: "Youtube",
                image:"youtube_text",
                tooltip: "Youtube",
                url: "https://youtube.com"
            },
            {
                name: "Discord",
                image:"discord",
                tooltip: "Discord",
                url: "https://discord.com"
            },
            {
                name: "Netflix",
                image:"netflix",
                tooltip: "Netflix",
                url: "https://netflix.com"
            },
            {
                name: "Gilltrick",
                image:"gilltrick",
                tooltip: "Gilltrick",
                url: "https://gilltrick.com"
            }
        ]
        return items;
    }
}