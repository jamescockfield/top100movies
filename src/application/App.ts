import express, { Request, Response, Express } from "express";

import { TMDBApiProvider } from "../application/provider/TMDBApiProvider";

export class App {
    static getApp(): Express {
        const tmdbApi = TMDBApiProvider.getApi();
        const app = express();

        app.get("/", async (request: Request, response: Response) => {
            response.end("Hello world");
        });

        app.get(
            "/movie/:movieId",
            async (request: Request, response: Response) => {
                const movieData = await tmdbApi.getMovie(
                    request.params.movieId
                );

                response.json(movieData);
            }
        );

        return app;
    }
}
