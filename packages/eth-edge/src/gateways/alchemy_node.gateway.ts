import { request, Method, RequestFunc } from "@cryptify/common/src/helpers/request";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AlchemyNodeGateway {
    request: RequestFunc;
    constructor(private configService: ConfigService) {
        const uri = `https://${configService.get<string>("ALCHEMY_HOST")}`;
        this.request = request(uri);
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
        return this.request(Method.PATCH, headers, path, body);
    }
}
