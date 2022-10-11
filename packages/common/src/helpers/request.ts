import fetch from "node-fetch";
import { HttpError } from "@cryptify/common/src/errors/http_error";
import { BadRequestException } from "@nestjs/common";

export function request(uri: string) {
    return async <T>(method: Method, headers: Headers, path: string, body: any): Promise<any> => {
        const response = await fetch(`${uri}/${path}`, {
            method: Method[method],
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
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

export type RequestFunc = <T>(method: Method, headers: Headers, path: string, body: any) => Promise<T>;

type Headers = {
    [key: string]: string;
};

export enum Method {
    POST,
    GET,
    PUT,
    PATCH,
    DELETE,
}
