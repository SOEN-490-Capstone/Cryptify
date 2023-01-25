import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AbstractServiceGateway } from "@cryptify/common/src/utils/gateway/abstract_service_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BlockchainComGateway extends AbstractServiceGateway {
    private static readonly DECIMALS: number = 100000000;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Transaction)
        private readonly transactionsRepository: Repository<Transaction>,
    ) {
        super(`https://${configService.get<string>("BLOCKCHAIN_COM_HOST")}`);
    }

    async getBalance(walletAddress: string): Promise<string> {
        const path = `balance?active=${walletAddress}`;
        const res = await this.request<BalanceResponse>(Method.GET, {}, path, null);

        // Bitcoin only supports 8 decimal places meaning it can be safely represented as a javascript number
        // and does not need to be converted to an intermediate currency type like Ethereum, for the purpose
        // of uniformity we will handle it as a string
        return (+res[walletAddress].final_balance / BlockchainComGateway.DECIMALS).toString();
    }

    async getTransactions(walletAddress: string): Promise<Transaction[]> {
        // Get the sent and received transactions from the API
        const path = `rawaddr/${walletAddress}`;
        const outAndInTransactions = await this.request<TransactionsResponse>(Method.GET, {}, path, null);

        return outAndInTransactions.txs
            .flatMap((tx) =>
                this.reversePoolMIMOTransaction(
                    tx.inputs.map((input) => input.prev_out),
                    tx.out,
                ).map(([inWallet, outWallet, amount]) =>
                    this.transactionsRepository.create({
                        transactionAddress: tx.hash,
                        walletIn: outWallet.addr,
                        walletOut: inWallet.addr,
                        amount,
                        createdAt: new Date(tx.time * 1000),
                    }),
                ),
            )
            .filter((transaction) => walletAddress === transaction.walletIn || walletAddress === transaction.walletOut);
    }

    async getTransactionsByTxAddress(txAddress: string): Promise<Transaction[]> {
        const path = `rawtx/${txAddress}`;
        const tx = await this.request<TransactionResponse>(Method.GET, {}, path, null);

        // Reverse the pool transaction to get NxM pairs and then construct the transaction entity from each
        // pair + amount tuple
        // Note: wallet out amounts + fee = wallet in amount
        // Note: inWallet refers to a wallet that is putting money in (inputting) bitcoin into the transaction pool
        // and outWallet refers to a wallet that is taking money out from the transaction pool, our domain transaction
        // has the reverse where a walletIn takes money out of the pool, and a walletOut puts money into the pool
        return this.reversePoolMIMOTransaction(
            tx.inputs.map((input) => input.prev_out),
            tx.out,
        ).map(([inWallet, outWallet, amount]) =>
            this.transactionsRepository.create({
                transactionAddress: tx.hash,
                walletIn: outWallet.addr,
                walletOut: inWallet.addr,
                amount,
                createdAt: new Date(tx.time * 1000),
            }),
        );
    }

    private reversePoolMIMOTransaction(inputs: Out[], outputs: Out[]): PairsWithAmount {
        // Get the total amount of BTC taken out of the transaction pool, this will exclude the amount spent in fees
        const totalOut = outputs.reduce((sum, output) => sum + +output.value, 0);
        // Cross the inputs and outputs to produce NxM pairs of transactions, then reverse the transaction MIMO pool
        // amount by taking the input amount times proportional output (output / total output) this will nicely split
        // the MIMO transaction to multiple domain transactions
        return inputs.flatMap((input) =>
            outputs.map((output) => {
                const amount = (+input.value * (+output.value / totalOut)) / BlockchainComGateway.DECIMALS;
                return [input, output, amount.toString()] as const;
            }),
        );
    }
}

type PairsWithAmount = (readonly [Out, Out, string])[];

interface BalanceResponse {
    final_balance: number;
    n_tx: number;
    total_received: number;
}

interface TransactionsResponse {
    address: string;
    n_tx: number;
    total_received: number;
    total_sent: number;
    final_balance: number;
    txs: Tx[];
}

interface TransactionResponse {
    hash: string;
    ver: number;
    vin_sz: number;
    vout_sz: number;
    size: number;
    weight: number;
    fee: number;
    relayed_by: string;
    lock_time: number;
    tx_index: number;
    double_spend: boolean;
    time: number;
    block_index: number;
    block_height: number;
    inputs: Input[];
    out: Out[];
}

interface Tx {
    hash: string;
    ver: number;
    vin_sz: number;
    vout_sz: number;
    size: number;
    weight: number;
    fee: number;
    lock_time: number;
    tx_index: number;
    double_spend: boolean;
    time: number;
    block_index: number;
    block_height: number;
    inputs: Input[];
    out: Out[];
    result: number;
    balance: number;
}

interface Input {
    sequence: number;
    witness: string;
    script: string;
    index: number;
    prev_out: Out;
}

interface Out {
    addr: string;
    n: number;
    script: string;
    spending_outpoints: SpendingOutpoint[];
    spent: boolean;
    tx_index: number;
    type: number;
    value: number;
}

interface SpendingOutpoint {
    n: number;
    tx_index: number;
}
