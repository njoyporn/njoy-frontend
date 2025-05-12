export interface SidebarItem {
    name: string;
    url: string
    image?: string;
    href?: string;
    tooltip?: string;
    section?: string;
    selected?:boolean;
}