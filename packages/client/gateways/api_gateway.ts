import { AbstractGateway } from "@cryptify/common/src/gateway/abstract_gateway";
import { HttpError } from "@cryptify/common/src/errors/http_error";

export abstract class ApiGateway extends AbstractGateway {
    protected constructor() {
        const uri = `http://${process.env.API_URL}:${process.env.API_PORT}`;
        super(uri, fetch);
    }

    protected async handleError(response: any): Promise<void> {
        const resBody = await response.json();

        throw new HttpError(resBody.message, response.status);
    }
}
