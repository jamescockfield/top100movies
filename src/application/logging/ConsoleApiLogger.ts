import { ApiLogger } from "./ApiLogger";

// TODO: implement a logger using a nicer plugin
// TODO: check if there is a free plan on Datadog we can implement a logger for

export class ConsoleApiLogger implements ApiLogger {
    log(url: string, data: object | null): void {
        console.log(`Request received on: ${url}: ${JSON.stringify(data)}`);
    }
}
