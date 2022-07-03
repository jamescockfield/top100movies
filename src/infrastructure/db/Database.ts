export interface Database {
    listTables(): Promise<string[]>;
    createTable(
        tableName: string,
        keyColumnName: string,
        ...columnNames: string[]
    ): Promise<boolean>;
}
