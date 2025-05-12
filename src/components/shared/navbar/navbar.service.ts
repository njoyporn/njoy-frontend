import type { NavbarItem } from "./navbar.type";

export class NavbarService {

    constructor(public items: NavbarItem[] = []){}

    public createDefaultItems(): NavbarItem[]{
        const items: NavbarItem[] = [
            {
                name: "Home",
                url: "/",
                section: "#home"
            },
            {
                name: "About",
                url: "/about",
                section: "#about"
            },
        ]
        return items;
    }
}