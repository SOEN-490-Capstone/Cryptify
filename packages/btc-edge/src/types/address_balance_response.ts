export interface SoChainAddressBalanceResponse {
    status: string;
    data: {
        network: string;
        address: string;
        confirmed_balance: string;
        unconfirmed_balance: string;
    };
}
