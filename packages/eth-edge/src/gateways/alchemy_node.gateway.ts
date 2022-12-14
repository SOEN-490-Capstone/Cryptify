import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AbstractServiceGateway } from "@cryptify/common/src/utils/gateway/abstract_service_gateway";
import { Method } from "@cryptify/common/src/utils/gateway/abstract_gateway";

@Injectable()
export class AlchemyNodeGateway extends AbstractServiceGateway {
    constructor(private configService: ConfigService) {
        super(`https://${configService.get<string>("ALCHEMY_HOST")}`);
    }

    async updateWebhookAddresses(addressesToAdd: string[], addressesToRemove: string[]): Promise<void> {
        const path = "api/update-webhook-addresses";
        const headers = {
            "X-Alchemy-Token": this.configService.get<string>("ALCHEMY_TOKEN"),
        };
        const body = {
            addresses_to_add: addressesToAdd,
            addresses_to_remove: addressesToRemove,
            webhook_id: this.configService.get<string>("ALCHEMY_ADDRESS_ACTIVITY_WEBHOOK_ID"),
        };

        await this.request<void>(Method.PATCH, headers, path, body);
    }
}
