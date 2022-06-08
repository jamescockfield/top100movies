import joi from "joi";

import { ResponseValidator } from "./ResponseValidator";
import { MovieData } from "../../domain/types/responses/MovieData";
import { ValidationError } from "../../domain/errors/ValidationError";

export class MovieValidator extends ResponseValidator {
    private schema = joi.object({
        genres: joi.object({
            name: joi.string(),
        }),
        imdb_id: joi.string(),
        popularity: joi.number(),
        original_language: joi.string(),
        release_date: joi.date(),
        title: joi.string(),
        vote_average: joi.number(),
        vote_count: joi.number(),
    });

    public validate(responseData: object): MovieData {
        // TODO: check if this matches a proper TS type guard

        const result = this.schema.validate(responseData, this.validateOptions);

        if (result.error) {
            // TODO: would be nice to properly illustrate that this function throws

            throw new ValidationError("Invalid movie details");
        }

        return result.value as MovieData;
    }
}
