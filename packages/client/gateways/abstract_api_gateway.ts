import { AbstractGateway } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { HttpError } from "@cryptify/common/src/errors/http_error";

export abstract class AbstractApiGateway extends AbstractGateway {
    protected constructor() {
        // Default for system tests to use deployed service IP
        const uri = `http://${process.env.API_URL || "3.141.46.148"}:${process.env.API_PORT}`;
        super(uri, fetch);
    }

    protected async handleError(response: any): Promise<void> {
        const resBody = await response.json();

        throw new HttpError(resBody.message, response.status);
    }
}
