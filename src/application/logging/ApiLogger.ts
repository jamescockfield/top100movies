export interface ApiLogger {
    log(url: string, data: object | null): void;
}
