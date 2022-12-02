export function formatAddress(address: string): string {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
}
