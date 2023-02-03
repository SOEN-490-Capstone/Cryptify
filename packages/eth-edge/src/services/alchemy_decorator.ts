import { Network, Alchemy } from "alchemy-sdk";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { AssetTransfersWithMetadataParams, AssetTransfersWithMetadataResponse } from "alchemy-sdk/dist/src/types/types";
import { BigNumber } from "@ethersproject/bignumber";
import { TransactionResponse } from "@ethersproject/abstract-provider";

@Injectable()
export class AlchemyDecorator {
    private delegate: Alchemy;

    constructor(private configService: ConfigService) {
        this.delegate = new Alchemy({
            apiKey: configService.get<string>("ALCHEMY_API_KEY"),
            network: Network.ETH_MAINNET,
        });
    }

    async getBalance(address: string): Promise<BigNumber> {
        return this.delegate.core.getBalance(address);
    }

    async getAssetTransfers(params: AssetTransfersWithMetadataParams): Promise<AssetTransfersWithMetadataResponse> {
        return this.delegate.core.getAssetTransfers(params);
    }

    async getTransaction(hash: string): Promise<TransactionResponse> {
        return this.delegate.core.getTransaction(hash);
    }
}
