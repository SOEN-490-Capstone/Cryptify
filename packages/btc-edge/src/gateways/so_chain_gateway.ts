import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AbstractServiceGateway } from "@cryptify/common/src/utils/gateway/abstract_service_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import {
    AddressBalanceResponse,
    TransactionResponse,
    TransactionsByWalletResponse,
} from "@cryptify/btc-edge/src/types/so_chain_responses";
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

    async getBalance(address: string): Promise<string> {
        const path = `get_address_balance/BTC/${address}`;
        const res = await this.request<AddressBalanceResponse>(Method.GET, {}, path, null);

        // Bitcoin only supports 8 decimal places meaning it can be safely represented as a javascript number
        // and does not need to be converted to an intermediate currency type like Ethereum, for the purpose
        // of uniformity we will handle it as a string
        return res.data.confirmed_balance;
    }

    async getTransactions(address: string): Promise<Transaction[]> {
        // Get the sent and received transactions from the API
        const path = `get_tx_received/BTC/${address}`;
        const outAndInTransactions = await this.request<TransactionsByWalletResponse>(Method.GET, {}, path, null);

        // Convert in and out transactions list to a list of transaction addresses then
        // hydrate each address with the rest of the transaction data from the API
        const transactionsData = await Promise.all(
            outAndInTransactions.data.txs
                .map((transaction) => transaction.txid)
                .map((addr) => this.request<TransactionResponse>(Method.GET, {}, `tx/BTC/${addr}`, null)),
        );

        // Cross the in and out wallets to form NxM number of transactions, filter for
        // address pairs that don't include the target address and finally construct the
        // transaction object
        return transactionsData.flatMap((transaction) =>
            transaction.data.inputs
                .flatMap((input) => transaction.data.outputs.map((output) => [input, output] as const))
                .filter(([inWallet, outWallet]) => inWallet.address === address || outWallet.address === address)
                .map(([inWallet, outWallet]) => ({
                    id: -1,
                    transactionAddress: transaction.data.txid,
                    walletIn: inWallet.address,
                    walletOut: outWallet.address,
                    amount: address === inWallet.address ? outWallet.value : inWallet.value,
                    createdAt: new Date(transaction.data.time * 1000),
                })),
        );
    }

    async getTransactionsByTxAddress(txAddress: string): Promise<Transaction[]> {
        const path = `tx/BTC/${txAddress}`;
        const txData = await this.request<TransactionResponse>(Method.GET, {}, path, null);

        // Cross the in and out wallets to form NxM number of transactions then construct the
        // transaction object, note: wallet in amounts + fee = wallet out amount
        return txData.data.inputs
            .flatMap((input) => txData.data.outputs.map((output) => [input, output] as const))
            .map(([inWallet, outWallet]) =>
                this.transactionsRepository.create({
                    transactionAddress: txData.data.txid,
                    walletIn: inWallet.address,
                    walletOut: outWallet.address,
                    amount: inWallet.value,
                    createdAt: new Date(txData.data.time * 1000),
                }),
            );
    }
}
