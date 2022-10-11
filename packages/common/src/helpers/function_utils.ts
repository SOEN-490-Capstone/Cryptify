export function zip<T, U>(a: T[], b: U[]): [T, U][] {
    return a.map((k, i) => [k, b[i]]);
}
