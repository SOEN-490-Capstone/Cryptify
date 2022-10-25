import { AbstractServiceGateway } from "@cryptify/common/src/utils/gateway/abstract_service_gateway";
import { CreateWalletRequest } from "@cryptify/common/src/requests/create_wallet_request";
import { WalletWithBalance } from "@cryptify/common/src/domain/wallet_with_balance";
import { GetWalletsRequest } from "@cryptify/common/src/requests/get_wallet_request";

export abstract class AbstractEdgeGatewayStrategy extends AbstractServiceGateway {
    protected constructor(uri: string) {
        super(uri);
    }

    abstract createWallet(req: CreateWalletRequest): Promise<WalletWithBalance>;
    abstract getWallets(req: GetWalletsRequest): Promise<WalletWithBalance[]>;
}
