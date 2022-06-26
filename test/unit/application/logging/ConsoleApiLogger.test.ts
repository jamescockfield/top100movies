import { ConsoleApiLogger } from "../../../../src/application/logging/ConsoleApiLogger";

describe("ConsoleApiLogger tests", () => {
    const apiLogger = new ConsoleApiLogger();

    const consoleSpy = jest.spyOn(console, "log");
    consoleSpy.mockImplementation((data) => data);

    it("should log to console", () => {
        const testUrl = "localhost:3000/test/url";
        const testData = { test: "data" };

        apiLogger.log(testUrl, testData);

        expect(consoleSpy.mock.calls[0][0]).toContain(testUrl);
        expect(consoleSpy.mock.calls[0][0]).toContain(JSON.stringify(testData));
    });
});
