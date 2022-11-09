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

@Injectable()
export class SoChainGateway extends AbstractServiceGateway {
    constructor(private configService: ConfigService) {
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
        const paths = [`get_tx_unspent/BTC/${address}`, `get_tx_received/BTC/${address}`];
        const outAndInTransactions = await Promise.all(
            paths.map(async (path) => this.request<TransactionsByWalletResponse>(Method.GET, {}, path, null)),
        );

        const transactionAddresses = outAndInTransactions
            .flatMap((transactionsResponse) => transactionsResponse.data.txs)
            .map((transaction) => transaction.txid);

        return (
            await Promise.all(
                transactionAddresses.map((addr) =>
                    this.request<TransactionResponse>(Method.GET, {}, `tx/BTC/${addr}`, null),
                ),
            )
        ).flatMap((transaction) =>
            transaction.data.inputs
                .flatMap((input) => transaction.data.outputs.map((output) => [input, output]))
                .filter(([inWallet, outWallet]) => inWallet.address == address || outWallet.address == address)
                .map(
                    ([inWallet, outWallet]): Transaction => ({
                        transactionAddress: transaction.data.txid,
                        walletIn: inWallet.address,
                        walletOut: outWallet.address,
                        amount: address == inWallet.address ? outWallet.value : inWallet.value,
                        createdAt: new Date(transaction.data.time),
                    }),
                ),
        );
    }
}
