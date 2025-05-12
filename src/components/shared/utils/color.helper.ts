export class ColorHelper {
    constructor(){}
    formatRbga(color: Color): string {
        return `rgba(${color.r},${color.g},${color.b},${color.a})`;
    }
    interpolateColour(color1: Color, color2: Color, progress: number): string {
        const color: Color = {
            r : color1.r + ((color2.r - color1.r) * progress),
            g : color1.g + ((color2.g - color1.g) * progress),
            b : color1.b + ((color2.b - color1.b) * progress),
            a : 1
        }

        return this.formatRbga(color);
    }
}

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}