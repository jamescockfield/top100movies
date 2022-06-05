import querystring, { ParsedUrlQueryInput } from "querystring";

import { Requester } from "../../domain/interfaces/Requester";

export class JSONFetchRequester implements Requester {
    async get(
        baseUrl: string,
        queryData?: object,
        headers?: HeadersInit
    ): Promise<object> {
        const query = querystring.stringify(queryData as ParsedUrlQueryInput); // TODO: check if there's a better way
        const url = `${baseUrl}?${query}`;
        const response = await fetch(url, {
            method: "GET",
            headers,
        });
        const responseBody = await response.json();

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
        const responseBody = response.json();

        return responseBody;
    }
}
