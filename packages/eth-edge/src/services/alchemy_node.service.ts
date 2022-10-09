import { Network, Alchemy, AssetTransfersCategory, AssetTransfersResponse } from "alchemy-sdk";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AlchemyNodeService {
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
            // over HTTP, this shouldn't cause any issues because we won't be doing
            // any calculations with the balance
            return balance.toString();
        } catch (error) {
            // If there is any error, mainly if the wallet is not found return a balance of 0
            // this is done because we can't verify that the wallet doesn't exist just because
            // it doesn't have any previous transactions
            return "0";
        }
    }

    async getInTransactions(wallet: string): Promise<AssetTransfersResponse>{
        return await this.alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            toAddress: wallet,
            excludeZeroValue: true,
            category: [AssetTransfersCategory.EXTERNAL],
            });
    }

    async getOutTransactions(wallet: string): Promise<AssetTransfersResponse>{
        return await this.alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: wallet,
            excludeZeroValue: true,
            category: [AssetTransfersCategory.EXTERNAL],
            });
    }

    async getBlock(blockNum: string) {
        return await this.alchemy.core.getBlock(blockNum);
    }
}
