const API_URI = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

export async function request<T>(method: Method, path: string, body: any): Promise<T> {
    const response = await fetch(`${API_URI}/${path}`, {
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

export enum Method {
    POST,
    GET,
    PUT,
    PATCH,
    DELETE,
}
