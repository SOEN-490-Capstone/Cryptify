const API_URI = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

export async function request<T>(path: string, req: any): Promise<T> {
    console.log(API_URI);
    const response = await fetch(`${API_URI}/${path}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    });

    return (await response.json()) as T;
}
