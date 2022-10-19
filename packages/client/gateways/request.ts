import { HttpError } from "@cryptify/common/src/errors/http_error";

const API_URI = `http://${process.env.API_URL}:${process.env.API_PORT}`;

export async function request<T>(method: Method, headers: Headers, path: string, body: any): Promise<T> {
    const response = await fetch(`${API_URI}/${path}`, {
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
        throw new HttpError(resBody.message, response.status);
    }

    return resBody as T;
}

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
