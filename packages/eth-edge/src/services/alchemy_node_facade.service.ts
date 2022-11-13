import { Network, Alchemy, AssetTransfersCategory } from "alchemy-sdk";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { normalizeCurrency } from "@cryptify/common/src/utils/currency_utils";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import Web3 from "web3";

@Injectable()
export class AlchemyNodeServiceFacade {
    private alchemy: Alchemy;

    constructor(private configService: ConfigService) {
        this.alchemy = new Alchemy({
            apiKey: configService.get<string>("ALCHEMY_API_KEY"),
            network: Network.ETH_MAINNET,
        });
    }

    async getBalance(address: string): Promise<string> {
        try {
            const balance = await this.alchemy.core.getBalance(address);
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
            this.alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                toAddress: wallet,
                excludeZeroValue: true,
                category: [AssetTransfersCategory.EXTERNAL],
                withMetadata: true,
            }),
            this.alchemy.core.getAssetTransfers({
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
        return transfers.map((transfer) => ({
            id: -1,
            transactionAddress: transfer.hash,
            walletIn: transfer.to,
            walletOut: transfer.from,
            amount: Web3.utils.toWei(normalizeCurrency(transfer.value), "ether"),
            createdAt: new Date(transfer.metadata.blockTimestamp),
        }));
    }
}
