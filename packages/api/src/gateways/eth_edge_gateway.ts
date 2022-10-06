import { request, Method } from "@cryptify/common/src/helpers/request";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EthEdgeGateway {
    request: <T>(method: Method, path: string, body: any) => Promise<T>;
    constructor(private configService: ConfigService) {
        this.request = request(configService.get<string>("ETH_EDGE_HOST"), configService.get<string>("ETH_EDGE_PORT"));
    }

    async createWallet<T>(req: CreateWalletRequest): Promise<T> {
        const path = `user/${req.userId}/wallet`;
        return this.request<T>(Method.POST, path, req);
    }
}
