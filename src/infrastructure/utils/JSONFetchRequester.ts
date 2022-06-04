import { Requester } from '../../domain/types/Requester';

export class JSONFetchRequester implements Requester {
	async get(url: string, queryData?: object, headers?: object): Promise<object> {
		const query = new URLSearchParams(queryData);
		const response = await fetch(url, {
			method: 'GET',
			query, 
			headers
		});
		const responseBody = await response.json();

		return responseBody;
	}

	async post(url: string, body?: object, headers?: object): Promise<object> {
		const response = await fetch(url, {
			method: 'POST',
			body, 
			headers
		});
		const responseBody = await response.json();

		return responseBody;
	}
}
