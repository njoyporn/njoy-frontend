export function HTMLFragmenttoString(fragment: HTMLFragment): string {
    return `<${fragment.tag} style="${fragment.style}" id="intro-message-${fragment.id}">${fragment.staticContent}<span style=${fragment.spanStyle}>${fragment.spanContent}</span><${fragment.tag}/>`

}

export interface HTMLFragment {
    id:number;
    tag: HTMLTag;
    staticContent: string;
    style?: string;
    classes?: string;
    spanStyle?: string;
    spanContent: string;
}

export type HTMLTag = "div" | "p" | "span" | "h1" | "h2" | "h4"