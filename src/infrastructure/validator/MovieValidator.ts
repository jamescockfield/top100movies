import joi from "@hapi/joi";
import "joi-extract-type";

import { ResponseValidator } from "../../domain/interfaces/ResponseValidator";
import { ValidatedResponseData } from "../../domain/types/ValidatedResponseData";

const movieResponseSchema = joi.object({});

export type MovieData = joi.extractType<typeof movieResponseSchema>;

export class MovieValidator implements ResponseValidator {
    public validate(responseData: object): MovieData {
        // TODO: check if this matches a proper TS type guard
        joi.assert(responseData, movieResponseSchema); // TODO: would be nice to properly illustrate that this function throws

        return responseData as ValidatedResponseData;
    }
}
