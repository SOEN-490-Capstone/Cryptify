const API_URI = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

export async function request<T>(path: string, req: any): Promise<T> {
    const response = await fetch(`${API_URI}/${path}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    });
    const body = await response.json();

    if (response.status >= 300) {
        throw new Error(body.message);
    }

    return body as T;
}
