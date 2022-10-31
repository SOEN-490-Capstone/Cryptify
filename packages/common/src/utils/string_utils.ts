export function titleCase(text: string): string {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function formatWalletAddress(address: string): string {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
}
