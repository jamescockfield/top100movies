import { Requester } from "../../domain/interfaces/Requester";
import { MovieValidator } from "../../infrastructure/validator/MovieValidator";
import { MovieData } from "../../domain/types/responses/MovieData";

export class TMDBApi {
    constructor(
        private request: Requester,
        private baseUrl: string,
        private accessToken: string,
        private movieValidator: MovieValidator
    ) {}

    private getAuthHeader(): { Authorization: string } {
        return { Authorization: `Bearer ${this.accessToken}` };
    }

    public async getMovie(movieId: string): Promise<MovieData | null> {
        const header = this.getAuthHeader()
        const response = await this.request.get(
            `${this.baseUrl}/movie/${movieId}`,
            undefined,
            header
        );

        try {
            const validatedResponse = this.movieValidator.validate(response);

            return validatedResponse;
        } catch (error) {
            console.log(error); // TODO: handle properly

            return null;
        }
    }
}
