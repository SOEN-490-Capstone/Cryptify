import {AbstractGateway, Method} from "@cryptify/common/src/gateway/abstract_gateway";
import {ConfigService} from "@nestjs/config";
import fetch from "node-fetch";
import {CreateWalletRequest} from "@cryptify/common/src/requests/create_wallet_request";
import {WalletWithBalance} from "@cryptify/common/src/domain/wallet_with_balance";
import {GetWalletsRequest} from "@cryptify/common/src/requests/get_wallet_request";
import {BadRequestException} from "@nestjs/common";
import {HttpError} from "@cryptify/common/src/errors/http_error";

export class Gateway extends AbstractGateway {

    protected constructor(uri: string) {
        super(uri, fetch);
    }
    protected async handleError(response: any): Promise<void> {
        const resBody = await response.json();

        // Re throw nestjs specific errors based on status code returned from HTTP req, this will
        // allow us to then send the correct error and HTTP status code to the downstream service
        // or handle it properly in the frontend
        if (response.status == 400) {
            throw new BadRequestException(resBody.message);
        }

        throw new HttpError(resBody.message, response.status);
    }
}
