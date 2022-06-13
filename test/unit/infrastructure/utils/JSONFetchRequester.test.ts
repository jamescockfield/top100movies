import * as fetch from "node-fetch";
import { JSONFetchRequester } from "../../../../src/infrastructure/utils/JSONFetchRequester";

describe("JSONFetchRequester tests", () => {
    const fetchSpy = jest.spyOn(fetch, "default");

    const requester = new JSONFetchRequester();

    const headers = { header: "headerData" };
    const expectedResponse = { response: "responseData" };

    beforeAll(() => {
        fetchSpy.mockImplementation(
            async () =>
                ({
                    json: async () => expectedResponse,
                } as fetch.Response)
        );
    });

    afterAll(() => {
        fetchSpy.mockRestore();
    });

    it("should GET", async () => {
        const response = await requester.get(
            "url",
            { query: "queryData" },
            headers
        );

        expect(fetchSpy).toBeCalledWith("url?query=queryData", {
            method: "GET",
            headers,
        });

        expect(response).toStrictEqual(expectedResponse);
    });

    it("should POST", async () => {
        const bodyData = { body: "bodyData" };
        const response = await requester.post("url", bodyData, headers);

        expect(fetchSpy).toBeCalledWith("url", {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers,
        });

        expect(response).toStrictEqual(expectedResponse);
    });

    // TODO: implement failure handling for GET and POST
});
