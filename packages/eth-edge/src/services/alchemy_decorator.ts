import { Network, Alchemy, AssetTransfersCategory } from "alchemy-sdk";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { normalizeCurrency } from "@cryptify/common/src/utils/currency_utils";
import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
import Web3 from "web3";
import {AssetTransfersWithMetadataParams, AssetTransfersWithMetadataResponse} from "alchemy-sdk/dist/src/types/types";
import {BigNumber} from "@ethersproject/bignumber";

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
}
