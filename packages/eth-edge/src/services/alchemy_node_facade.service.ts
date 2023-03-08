import { AssetTransfersCategory } from "alchemy-sdk";
import { Injectable } from "@nestjs/common";
import { normalizeCurrency } from "@cryptify/common/src/utils/currency_utils";
import {Transaction, TransactionBuilder} from "@cryptify/common/src/domain/entities/transaction";
import Web3 from "web3";
import { AlchemyDecorator } from "@cryptify/eth-edge/src/services/alchemy_decorator";
import { TransactionResponse } from "@ethersproject/abstract-provider";

@Injectable()
export class AlchemyNodeServiceFacade {
    constructor(private readonly alchemy: AlchemyDecorator) {}

    async getBalance(address: string): Promise<string> {
        try {
            const balance = await this.alchemy.getBalance(address);
            // Serializing the BigNumber as a string so we can easily transport it
            // over HTTP, we will leave the balance as WEI for now to allow BigNumber
            // conversions and calculations, it will only be converted to ETHER when
            // the value is ready to be displayed
            return balance.toString();
        } catch (error) {
            // If there is any error, mainly if the wallet is not found return a balance of 0
            // this is done because we can't verify that the wallet doesn't exist just because
            // it doesn't have any previous transactions
            return "0";
        }
    }

    async getTransactions(wallet: string): Promise<Transaction[]> {
        // Get both in and out transactions in parallel then flatten the 2D array
        // into a single dimension
        const assetTransfers = await Promise.all([
            this.alchemy.getAssetTransfers({
                fromBlock: "0x0",
                toAddress: wallet,
                excludeZeroValue: true,
                category: [AssetTransfersCategory.EXTERNAL],
                withMetadata: true,
            }),
            this.alchemy.getAssetTransfers({
                fromBlock: "0x0",
                fromAddress: wallet,
                excludeZeroValue: true,
                category: [AssetTransfersCategory.EXTERNAL],
                withMetadata: true,
            }),
        ]);
        const transfers = assetTransfers.flatMap(({ transfers }) => transfers);

        // We normalize the currency to remove scientific notation that is in
        // some alchemy transactions then convert all transaction amounts
        // from ETHER to WEI so we can represent them as BigIntegers
        return Promise.all(
            transfers.map(async (transfer) => {
                const txnBuilder = new TransactionBuilder()
                    .setAddress(transfer.hash)
                    .setWalletIn(transfer.to)
                    .setWalletOut(transfer.from)
                    .setAmount(transfer.value)
                    .setCreatedAt(transfer.metadata.blockTimestamp)

                const transactionDetails = await this.getTransaction(transfer.hash);
                if (transactionDetails) {
                    txnBuilder
                        .setGasPrice(transactionDetails.gasPrice.toString())
                        .setGasLimit(transactionDetails.gasLimit.toString());
                }

                return txnBuilder.build();
            }),
        );
    }

    private async getTransaction(hash: string): Promise<TransactionResponse> {
        // This function can fail sometimes from the ethereum node side so in that case we just won't assign the
        // transaction the extra details, in the future we can try to implement a retry mechanism on this
        try {
            return this.alchemy.getTransaction(hash);
        } catch (e) {
            return null;
        }
    }
}
