import express, { Request, Response, Express } from "express";

import { TMDBApiProvider } from "../application/provider/TMDBApiProvider";
import { ConsoleApiLogger } from "../application/logging/ConsoleApiLogger";

export class App {
    static getApp(): Express {
        const tmdbApi = TMDBApiProvider.getApi();
        const app = express();
        const apiLogger = new ConsoleApiLogger();

        app.get("/", async (request: Request, response: Response) => {
            response.end("Hello world");
        });

        app.get(
            "/movie/:movieId",
            async (request: Request, response: Response) => {
                const movieData = await tmdbApi.getMovie(
                    request.params.movieId
                );

                apiLogger.log(request.url, movieData);

                // TODO: add a response for null data

                response.json(movieData);
            }
        );

        return app;
    }
}
