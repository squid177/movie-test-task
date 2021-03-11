import { MovieRepository } from '../repositories/movie-repository';
import { Receiver } from '../../interfaces/receiver';

export class MovieReceiver implements Receiver {
  private count: number = 0;

  constructor(private movieRepository: MovieRepository) { }

  async onRow(data: any) {
    await this.movieRepository.addMovie({
      id: Number(data.id),
      originalTitle: String(data.original_title)
    });
    this.count++;
    console.log(`Movie saved. Count: ${this.count}`);
  }
}