export function copyToClipboard(id: string): void {
    const copyText = document.getElementById(id);
    if (!copyText) return;
    navigator.clipboard.writeText(copyText.innerHTML);
}