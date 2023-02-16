export interface UpdateContactRequest {
    userId: number;
    contactName: string;
    newName?: string;
    walletAddrs?: string[];
}
