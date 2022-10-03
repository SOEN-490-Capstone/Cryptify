import fetch from "node-fetch";

export class ApiRequest {
    apiUri: string;

    constructor(apiUrl: string, apiPort: string) {
        this.apiUri = `http://${apiUrl}:${apiPort}`;
    }

    async request<T>(method: Method, path: string, body: any): Promise<T> {
        console.log(this.apiUri);
        const response = await fetch(`${this.apiUri}/${path}`, {
            method: Method[method],
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const resBody = await response.json();

        if (response.status >= 300) {
            throw new Error(resBody.message);
        }

        return resBody as T;
    }
}

export enum Method {
    POST,
    GET,
    PUT,
    PATCH,
    DELETE,
}
