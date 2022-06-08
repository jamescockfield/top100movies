import { MovieValidator } from "../../../../src/infrastructure/validator/MovieValidator";
import { MovieData } from "../../../../src/domain/types/responses/MovieData";

const movieValidator = new MovieValidator();

describe("MovieValidator tests", () => {
    let movieData: Partial<MovieData>;

    beforeEach(() => {
        movieData = {
            genres: {
                name: "Horror",
            },
            imdb_id: "1234",
            popularity: 99999999,
            original_language: "English",
            release_date: "01-01-2000",
            title: "Attack of the Blobs",
            vote_average: 5,
            vote_count: 99999999,
        };
    });

    it("should validate valid JSON", () => {
        expect(() => movieValidator.validate(movieData)).not.toThrow();
    });

    it("should invalidate missing fields", () => {
        delete movieData.title;

        expect(() => movieValidator.validate(movieData)).toThrow(
            "Invalid movie details"
        );
    });

    it("should invalidate incorrect fields", () => {
        movieData.original_language = 1234 as unknown as string;

        expect(() => movieValidator.validate(movieData)).toThrow(
            "Invalid movie details"
        );
    });

    it("should invalidate incorrect nested fields", () => {
        (movieData as MovieData).genres.name = 1234 as unknown as string;

        expect(() => movieValidator.validate(movieData)).toThrow(
            "Invalid movie details"
        );
    });
});
