import { Requester } from "../../domain/interfaces/Requester";
import { ResponseValidator } from "../../domain/interfaces/ResponseValidator";
import { MovieData } from "../../infrastructure/validator/MovieValidator"; // TODO: lay this out in proper location, maybe joi schemas in domain/schemas?

export class TMDBApi {
    constructor(
        private request: Requester,
        private baseUrl: string,
        private accessToken: string,
        private validator: ResponseValidator
    ) {}

    private getAuthHeader(): { Authorization: string } {
        return { Authorization: `Bearer ${this.accessToken}` };
    }

    private async getMovie(movieId: string): Promise<MovieData | null> {
        const response = await this.request.get(
            `${this.baseUrl}/movie/${movieId}`
        );

        try {
            const validatedResponse = this.validator.validate(response);

            return validatedResponse;
        } catch (error) {
            console.log(error); // TODO: handle properly

            return null;
        }
    }
}
