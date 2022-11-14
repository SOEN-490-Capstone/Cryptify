export abstract class AbstractGateway {
    protected constructor(private readonly uri: string, private readonly fetch: any) {}

    protected async request<T>(method: Method, headers: Headers, path: string, body: any): Promise<T> {
        const response = await this.fetch(`${this.uri}/${path}`, {
            method: Method[method],
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : null,
        });
        if (response.status >= 300) {
            await this.handleError(response);
        }

        const resBody = await response.json();
        return resBody as T;
    }

    protected abstract handleError(response: any): Promise<void>;
}

export enum Method {
    POST,
    GET,
    PUT,
    PATCH,
    DELETE,
}

type Headers = {
    [key: string]: string;
};
