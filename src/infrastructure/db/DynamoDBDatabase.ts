import {
    DynamoDBClient,
    CreateTableCommand,
    ListTablesCommand,
} from "@aws-sdk/client-dynamodb";

import { Database } from "./Database";
import { applicationConfig } from "../../application/config/applicationConfig";

enum AttributeTypes {
    STRING = "S",
}

enum KeyTypes {
    HASH = "HASH",
}

export class DynamoDBDatabase implements Database {
    private db = new DynamoDBClient({
        endpoint: applicationConfig.DYNAMODB_URL,
    });

    public async listTables(): Promise<string[]> {
        const response = await this.db.send(new ListTablesCommand({}));
        const tables = response.TableNames;

        if (!tables) {
            throw Error();
        }

        return tables;
    }

    public async createTable(
        tableName: string,
        keyColumnName: string,
        ...columnNames: string[]
    ): Promise<boolean> {
        const attributeDefinitions = [keyColumnName, ...columnNames].map(
            (columnName) => ({
                AttributeName: columnName,
                AttributeType: AttributeTypes.STRING,
            })
        );

        const response = await this.db.send(
            new CreateTableCommand({
                TableName: tableName,
                AttributeDefinitions: attributeDefinitions,
                KeySchema: [
                    {
                        AttributeName: keyColumnName,
                        KeyType: KeyTypes.HASH,
                    },
                ],
            })
        );

        const success = response.$metadata.httpStatusCode == 200;

        return success;
    }
}
