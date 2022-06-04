import joi from 'joi';
import 'joi-extract-type';

import { Validator } from '../../domain/interfaces/Validator';
import { ValidatedResponseData } from '../../domain/types/ValidatedResponseData';

const movieResponseSchema = joi.object({});

export type MovieData = joi.extractType<typeof movieResponseSchema>;

export class MovieValidator implements Validator {

	public validate(responseData: object): ValidatedMovieResponse { // TODO: check if this matches a proper TS type guard
		movieResponseSchema.assert(responseData); // TODO: would be nice to properly illustrate that this function throws

		return responseData as ValidatedResponseData;
	}
}
