import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoDBDatabase } from "../../../../src/infrastructure/db/DynamoDBDatabase";

describe("DynamoDBDatabase tests", () => {
    const db = new DynamoDBDatabase();
    const dynamoDBSpy = jest.spyOn(DynamoDBClient.prototype, "send");

    afterEach(() => {
        dynamoDBSpy.mockReset();
    });

    it("should list tables when there are none", async () => {
        dynamoDBSpy.mockResolvedValue({ TableNames: [] } as never);

        const tables = await db.listTables();

        expect(tables).toMatchObject([]);
    });

    it("should create a table", async () => {
        dynamoDBSpy.mockResolvedValue({
            $metadata: { httpStatusCode: 200 },
        } as never);

        const wasCreated = await db.createTable(
            "test",
            "keyColumnName",
            "secondColumn",
            "thirdColumn"
        );

        expect(dynamoDBSpy.mock.calls[0][0].input).toMatchObject({
            TableName: "test",
            AttributeDefinitions: [
                { AttributeName: "keyColumnName", AttributeType: "S" },
                { AttributeName: "secondColumn", AttributeType: "S" },
                { AttributeName: "thirdColumn", AttributeType: "S" },
            ],
            KeySchema: [
                {
                    AttributeName: "keyColumnName",
                    KeyType: "HASH",
                },
            ],
        });

        expect(wasCreated).toBe(true);
    });
});
