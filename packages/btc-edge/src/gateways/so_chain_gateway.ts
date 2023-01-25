import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AbstractServiceGateway } from "@cryptify/common/src/utils/gateway/abstract_service_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SoChainGateway extends AbstractServiceGateway {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Transaction)
        private readonly transactionsRepository: Repository<Transaction>,
    ) {
        super(`https://${configService.get<string>("SO_CHAIN_HOST")}`);
    }

    async getBalance(walletAddress: string): Promise<string> {
        const path = `get_address_balance/BTC/${walletAddress}`;
        const res = await this.request<AddressBalanceResponse>(Method.GET, {}, path, null);

        // Bitcoin only supports 8 decimal places meaning it can be safely represented as a javascript number
        // and does not need to be converted to an intermediate currency type like Ethereum, for the purpose
        // of uniformity we will handle it as a string
        return res.data.confirmed_balance;
    }

    async getTransactions(walletAddress: string): Promise<Transaction[]> {
        // Get the sent and received transactions from the API
        const path = `get_tx_received/BTC/${walletAddress}`;
        const outAndInTransactions = await this.request<TransactionsByWalletResponse>(Method.GET, {}, path, null);

        // Convert in and out transactions list to a list of transaction addresses then
        // hydrate each address with the rest of the transaction data from the API
        const transactions = await Promise.all(
            outAndInTransactions.data.txs
                .map((transaction) => transaction.txid)
                .map((address) => this.getTransactionsByTxAddress(address)),
        );

        // Since we have access to the wallet address of the user we can filter out the transaction pairs that aren't
        // associated to the target wallet
        return transactions
            .flat()
            .filter((transaction) => walletAddress === transaction.walletIn || walletAddress === transaction.walletOut);
    }

    async getTransactionsByTxAddress(txAddress: string): Promise<Transaction[]> {
        const path = `get_tx/BTC/${txAddress}`;
        const txData = await this.request<TransactionResponse>(Method.GET, {}, path, null);

        // Reverse the pool transaction to get NxM pairs and then construct the transaction entity from each
        // pair + amount tuple
        // Note: wallet out amounts + fee = wallet in amount
        // Note: inWallet refers to a wallet that is putting money in (inputting) bitcoin into the transaction pool
        // and outWallet refers to a wallet that is taking money out from the transaction pool, our domain transaction
        // has the reverse where a walletIn takes money out of the pool, and a walletOut puts money into the pool
        return this.reversePoolMIMOTransaction(txData.data.inputs, txData.data.outputs).map(
            ([inWallet, outWallet, amount]) =>
                this.transactionsRepository.create({
                    transactionAddress: txData.data.txid,
                    walletIn: outWallet.address,
                    walletOut: inWallet.address,
                    amount,
                    createdAt: new Date(txData.data.time * 1000),
                }),
        );
    }

    private reversePoolMIMOTransaction(
        inputs: TransactionResponseInput[],
        outputs: TransactionResponseOutput[],
    ): PairsWithAmount {
        // Get the total amount of BTC taken out of the transaction pool, this will exclude the amount spent in fees
        const totalOut = outputs.reduce((sum, output) => sum + +output.value, 0);
        // Cross the inputs and outputs to produce NxM pairs of transactions, then reverse the transaction MIMO pool
        // amount by taking the input amount times proportional output (output / total output) this will nicely split
        // the MIMO transaction to multiple domain transactions
        return inputs.flatMap((input) =>
            outputs.map((output) => {
                const amount = (+input.value * (+output.value / totalOut)).toString();
                return [input, output, amount] as const;
            }),
        );
    }
}

interface AddressBalanceResponse {
    status: string;
    data: {
        network: string;
        address: string;
        confirmed_balance: string;
        unconfirmed_balance: string;
    };
}

interface TransactionsByWalletResponse {
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

interface TransactionResponse {
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
        inputs: TransactionResponseInput[];
        outputs: TransactionResponseOutput[];
        tx_hex: string;
    };
    code: number;
    message: string;
}

interface TransactionResponseInput {
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
}

interface TransactionResponseOutput {
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
}

type PairsWithAmount = (readonly [TransactionResponseInput, TransactionResponseOutput, string])[];
