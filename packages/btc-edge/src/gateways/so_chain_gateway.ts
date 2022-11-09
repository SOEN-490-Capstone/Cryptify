import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AbstractServiceGateway } from "@cryptify/common/src/utils/gateway/abstract_service_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { SoChainAddressBalanceResponse } from "@cryptify/btc-edge/src/types/address_balance_response";

@Injectable()
export class SoChainGateway extends AbstractServiceGateway {
    constructor(private configService: ConfigService) {
        super(`https://${configService.get<string>("SO_CHAIN_HOST")}`);
    }

    async getBalance(address: string): Promise<string> {
        const path = `get_address_balance/BTC/${address}`;
        const res = await this.request<SoChainAddressBalanceResponse>(Method.GET, {}, path, null);

        // Bitcoin only supports 8 decimal places meaning it can be safely represented as a javascript number
        // and does not need to be converted to an intermediate currency type like Ethereum, for the purpose
        // of uniformity we will handle it as a string
        return res.data.confirmed_balance;
    }
}
