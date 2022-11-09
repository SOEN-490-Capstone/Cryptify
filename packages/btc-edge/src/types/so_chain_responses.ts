export interface AddressBalanceResponse {
    status: string;
    data: {
        network: string;
        address: string;
        confirmed_balance: string;
        unconfirmed_balance: string;
    };
}

export interface TransactionsByWalletResponse {
    status: string;
    data: {
        network: string;
        address: string;
        txs: {
            txid: string;
            output_no: number;
            script_asm: string;
            script_hex: string;
            value: string;
            confirmations: number;
            time: number;
        }[];
    };
}

export interface TransactionResponse {
    status: string;
    data: {
        network: string;
        txid: string;
        blockhash: string;
        block_no: number;
        confirmations: number;
        time: number;
        size: number;
        vsize: number;
        version: number;
        locktime: number;
        sent_value: string;
        fee: string;
        inputs: {
            input_no: number;
            address: string;
            value: string;
            received_from: {
                txid: string;
                output_no: number;
            };
            script_asm: string;
            script_hex: string;
            witness: string[];
        }[];
        outputs: {
            output_no: number;
            address: string;
            value: string;
            type: string;
            spent: {
                txid: string;
                input_no: number;
            };
            script_asm: string;
            script_hex: string;
        }[];
        tx_hex: string;
    };
    code: number;
    message: string;
}
