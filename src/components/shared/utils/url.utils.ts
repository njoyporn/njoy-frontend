

export function getDomain(url: string): string {
    let x = url.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im);
    if(!x) return url != "" ? url : "no url";
    return x[1];
}