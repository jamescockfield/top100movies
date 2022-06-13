import { MovieValidator } from "../../../../src/infrastructure/validator/MovieValidator";
import { MovieData } from "../../../../src/domain/types/responses/MovieData";
import rawMovieData from "../../../data/movieData.json";

const movieValidator = new MovieValidator();

describe("MovieValidator tests", () => {
    let movieData: Partial<MovieData>;

    beforeEach(() => {
        movieData = JSON.parse(
            JSON.stringify(rawMovieData)
        ) as Partial<MovieData>;
    });

    it("should validate and strip valid JSON", () => {
        expect(movieValidator.validate(movieData)).toMatchObject({
            genres: [
                { name: "Animation" },
                { name: "Family" },
                { name: "Adventure" },
                { name: "Fantasy" },
                { name: "Romance" },
            ],
            imdb_id: "tt0103639",
            popularity: 79.727,
            original_language: "en",
            release_date: "1992-11-25",
            title: "Aladdin",
            vote_average: 7.6,
            vote_count: 9687,
        });
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
        (movieData as MovieData).genres[0].name = 1234 as unknown as string;

        expect(() => movieValidator.validate(movieData)).toThrow(
            "Invalid movie details"
        );
    });
});
