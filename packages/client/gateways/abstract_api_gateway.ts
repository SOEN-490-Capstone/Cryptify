import { AbstractGateway } from "@cryptify/common/src/utils/gateway/abstract_gateway";
import { HttpError } from "@cryptify/common/src/errors/http_error";

export abstract class AbstractApiGateway extends AbstractGateway {
    protected constructor() {
        const uri = `http://172.31.118.187:${process.env.API_PORT}`;
        super(uri, fetch);
    }

    protected async handleError(response: any): Promise<void> {
        const resBody = await response.json();

        throw new HttpError(resBody.message, response.status);
    }
}
