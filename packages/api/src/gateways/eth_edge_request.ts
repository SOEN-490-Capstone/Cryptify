import { request, Method } from "@cryptify/common/src/helpers/request";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EthEdgeRequest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ethEdgeRequest: <T>(method: Method, path: string, body: any) => Promise<any>;
    constructor(private configService: ConfigService) {
        this.ethEdgeRequest = request(
            configService.get<string>("ETH_EDGE_URL"),
            configService.get<string>("ETH_EDGE_PORT"),
        );
    }

    async createWallet(req: CreateWalletRequest): Promise<any> {
        const path = `user/${req.userId}/wallet`;
        return this.ethEdgeRequest<any>(Method.POST, path, req);
    }
}
