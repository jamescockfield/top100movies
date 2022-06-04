export interface Requester {
	async get(url: string, query?: object, headers?: object): Promise<object>;
	async post(url: string, body?: object, headers?: object): Promise<object>;
}
