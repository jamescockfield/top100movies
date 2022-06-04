import { Requester } from '../../domain/interfaces/Requester';
import { Validator } from '../../domain/interfaces/Validator';
import { MovieData } from '../../infrastructure/validator/MovieValidator'; // TODO: lay this out in proper location, maybe joi schemas in domain/schemas?

export class TMDBApi {
	constructor(
		private request: Requester,
		private baseUrl: string,
		private accessToken: string,
		private validator: Validator
	) {}

	private getAuthHeader(): { Authorization: string } {
		return { Authorization: `Bearer ${this.accessToken}`}
	}

	private async getMovie(movieId: string): Promise<MovieData> {
		const response = await this.request.get(`${this.baseUrl}/movie/${movieId}`);

		// TODO: install prettier

		try {
			const validatedResponse = this.validator.validate(response);

			return validatedResponse;
		} catch (error: Error) {
			console.log(error); // TODO: handle properly
			return;
		}
	}
}
