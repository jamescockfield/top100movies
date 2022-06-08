import { ValidatedResponseData } from "./ValidatedResponseData";

export interface MovieData extends ValidatedResponseData {
    genres: {
        name: string;
    };
    imdb_id: string;
    popularity: number;
    original_language: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
}
