export interface Requester {
    get(url: string, query?: object, headers?: object): Promise<object>;
    post(url: string, body?: object, headers?: object): Promise<object>;
}
