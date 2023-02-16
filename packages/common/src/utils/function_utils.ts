export function zip<T, U>(a: T[], b: U[]): [T, U][] {
    return a.map((k, i) => [k, b[i]]);
}

export function equals<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) {
        return false;
    }
    
    const x = [...a].sort();
    const y = [...b].sort();
    return x.every((v, i) => v === y[i]);
}