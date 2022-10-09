import fetch from "node-fetch";
import { HttpError } from "@cryptify/common/src/errors/http_error";
import { BadRequestException } from "@nestjs/common";

export function request(apiUrl: string, apiPort: string) {
    const apiUri = `http://${apiUrl}:${apiPort}`;
    return async <T>(method: Method, path: string, body: any): Promise<any> => {
        const response = await fetch(`${apiUri}/${path}`, {
            method: Method[method],
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
        });
        const resBody = await response.json();

        if (response.status >= 300) {
            // TODO refactor this out of the request handler so the same one can be used
            // by the frontend and the backend where the backend re-throws nestjs errors based
            // on the status code and the frontend uses the HttpError
            if (response.status == 400) {
                throw new BadRequestException(resBody.message);
            }

            throw new HttpError(resBody.message, response.status);
        }

        return resBody as T;
    };
}

export enum Method {
    POST,
    GET,
    PUT,
    PATCH,
    DELETE,
}
