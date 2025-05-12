export function pickRandom<T=any>(list: T[]): T {
    const rng: number = Math.floor(Math.random() * list.length);
    return [...list][rng];
} 