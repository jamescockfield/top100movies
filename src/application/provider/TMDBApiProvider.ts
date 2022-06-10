import { TMDBApi } from '../../infrastructure/api/TMDBApi';
import { applicationConfig } from '../config/applicationConfig';
import { JSONFetchRequester } from '../../infrastructure/utils/JSONFetchRequester';
import { MovieValidator } from '../../infrastructure/validator/MovieValidator';

export class TMDBApiProvider {
    public static getApi(): TMDBApi {
        const requester = new JSONFetchRequester();
        const movieValidator = new MovieValidator();
        const api = new TMDBApi(
            requester,
            applicationConfig.TMDB_API_URL,
            applicationConfig.TMDB_ACCESS_TOKEN,
            movieValidator
        );

        return api;
    }
}
