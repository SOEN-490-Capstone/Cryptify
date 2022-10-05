import { Network, Alchemy } from "alchemy-sdk";
import { ConfigService } from "@nestjs/config";
import { BigNumber } from "@ethersproject/bignumber";

export class AlchemyNodeService {
    private alchemy: Alchemy;

    constructor(private configService: ConfigService) {
        this.alchemy = new Alchemy({
            apiKey: this.configService.get<string>("ALCHEMY_API_KEY"),
            network: Network.ETH_MAINNET,
        });
    }

    async getBalance(address: string): Promise<string> {
        return (await this.alchemy.core.getBalance(address)).toString();
    }
}
