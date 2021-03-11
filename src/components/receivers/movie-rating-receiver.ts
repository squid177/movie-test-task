import { MovieRepository } from '../repositories/movie-repository';
import { Receiver } from '../../interfaces/receiver';

export class MovieRatingReceiver implements Receiver {
	private count: number = 0;

	constructor(private movieRepository: MovieRepository) {}

	async onRow(data: any) {	
		await this.movieRepository.addMovieRating({
			movieId: Number(data.movieId),
			rating: String(data.rating)
		});
		this.count++;
		console.log(`Movie rating saved. Count: ${this.count}`);
	}
}