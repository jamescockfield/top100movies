import fetch from 'node-fetch';
import { JSONFetchRequester } from '../../../../src/infrastructure/utils/JSONFetchRequester';

describe("JSONFetchRequester tests", () => {
    const requester = new JSONFetchRequester();

    const headers = { header: 'headerData' };
    const expectedResponse: Response = { body: { response: 'responseData' }};
    const fetchSpy = jest.spyOn(fetch);

    beforeAll(() => {
        fetchSpy.mockImplementation = jest.fn(async () => ({
            json: async () => expectedResponse
        }));
    });
    
    afterAll(() => {
        fetchSpy.mockRestore();
    });

    it("should GET", async () => {
        const response = await requester.get('url', { query: 'queryData' }, headers);

        expect(fetchSpy).toBeCalledWith(
            'url?query=queryData',
            { method: 'GET', headers }
        );
        
        expect(response).toStrictEqual(expectedResponse);
    });

    it("should POST", async () => {
        const bodyData = { body: 'bodyData' };
        const response = await requester.post('url', bodyData, headers);

        expect(fetchSpy).toBeCalledWith(
            'url',
            { 
                method: 'POST', 
                body: JSON.stringify(bodyData), 
                headers 
            }
        );
        
        expect(response).toStrictEqual(expectedResponse);
    });
});
