import { MovieRepository } from '../repositories/movie-repository';
import { IReceiver } from '../../interfaces/receiver';

export class MovieReceiver implements IReceiver {
  private count = 0;

  constructor(private movieRepository: MovieRepository) { }

  async onRow(data: Record<string, unknown>): Promise<void> {
    await this.movieRepository.addMovie({
      id: String(data.id),
      originalTitle: String(data.original_title)
    });
    this.count++;
    console.log(`Movie saved. Count: ${this.count}`);
  }
}