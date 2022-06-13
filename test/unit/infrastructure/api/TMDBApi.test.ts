import { TMDBApi } from "../../../../src/infrastructure/api/TMDBApi";
import { MovieValidator } from "../../../../src/infrastructure/validator/MovieValidator";

describe("TMDBApi tests", () => {
    const requester = { get: jest.fn(), post: jest.fn() };

    type MockMovieValidator = MovieValidator & { validate: jest.Mock };
    const movieValidator = { validate: jest.fn() } as MockMovieValidator;

    const baseUrl = "baseUrl";
    const accessToken = "accessToken";
    const movieId = "1234";

    const tmdbApi = new TMDBApi(
        requester,
        baseUrl,
        accessToken,
        movieValidator
    );

    const mockMovieData = { movie: "data" };
    const mockValidatedData = { validated: "data" };

    requester.get.mockReturnValue(mockMovieData);
    movieValidator.validate.mockReturnValue(mockValidatedData);

    it("should call the correct url", async () => {
        await tmdbApi.getMovie(movieId);

        const url = requester.get.mock.calls[0][0];

        expect(url).toBe(`${baseUrl}/movie/${movieId}`);
    });

    it("should set the correct auth header", async () => {
        await tmdbApi.getMovie(movieId);

        const headers = requester.get.mock.calls[0][2];

        expect(headers.Authorization).toBe(`Bearer ${accessToken}`);
    });

    it("should return the validated result from requester.get", async () => {
        const result = await tmdbApi.getMovie(movieId);

        expect(movieValidator.validate).toHaveBeenCalledWith(mockMovieData);
        expect(result).toBe(mockValidatedData);
    });
});
