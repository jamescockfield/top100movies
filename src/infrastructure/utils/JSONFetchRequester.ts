import fetch, { HeadersInit } from 'node-fetch';

import { Requester } from "../../domain/interfaces/Requester";

export class JSONFetchRequester implements Requester {
    async get(
        baseUrl: string,
        queryData?: Record<string, string>,
        headers?: HeadersInit
    ): Promise<object> {
        const query = new URLSearchParams(queryData).toString();
        const url = `${baseUrl}?${query}`;
        const response = await fetch(url, {
            method: "GET",
            headers,
        });
        const responseBody = await response.json() as object;

        return responseBody;
    }

    async post(
        url: string,
        body?: object,
        headers?: HeadersInit
    ): Promise<object> {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers,
        });
        const responseBody = await response.json() as object;

        return responseBody;
    }
}
