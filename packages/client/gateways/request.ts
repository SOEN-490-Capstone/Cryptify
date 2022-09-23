export async function request<T>(path: string, req: any): Promise<T> {
    const response = await fetch(`http://192.168.86.35:3001/${path}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    });

    return (await response.json()) as T;
}
