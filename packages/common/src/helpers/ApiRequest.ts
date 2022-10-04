import fetch from "node-fetch";

export function request(apiUrl: string, apiPort: string) {
    const apiUri = `http://${apiUrl}:${apiPort}`;
    console.log(apiUri);
    return async <T>(method: Method, path: string, body: any): Promise<any> => {
        const response = await fetch(`${apiUri}/${path}`, {
            method: Method[method],
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const resBody: any = await response.json();

        if (response.status >= 300) {
            throw new Error(resBody.message);
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
