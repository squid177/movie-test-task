import { MovieRepository } from '../repositories/movie-repository';
import { IReceiver } from '../../interfaces/receiver';

export class MovieRatingReceiver implements IReceiver {
	private count = 0;

	constructor(private movieRepository: MovieRepository) {}

	async onRow(data: Record<string, unknown>): Promise<void> {	
		await this.movieRepository.addMovieRating({
			movieId: String(data.movieId),
			rating: Number(data.rating)
		});
		this.count++;
		console.log(`Movie rating saved. Count: ${this.count}`);
	}
}