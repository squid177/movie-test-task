import { MovieModel } from './../models/movie';
import { MovieRatingModel } from './../models/movie-rating';

export class MovieRepository {

  async addMovie(data: any) {
    const newItem = new MovieModel();
    newItem.id = data.id;
    newItem.originalTitle = data.originalTitle;
    await newItem.save();
  }

  async addMovieRating(data: any) {
    const newItem = new MovieRatingModel();
    newItem.movie_id = data.movieId;
    newItem.rating = data.rating;
    await newItem.save();
  }

  async getTopRated() {
    return await MovieRatingModel.aggregate([
      {
        $group: {
          _id: '$movie_id',
          avg: {
            $avg: "$rating"
          }
        }
      },
      { $sort: { avg: -1 } },
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: 'id',
          as: 'movie'
        }
      },
      { $unwind: "$movie" },
      { $limit: 10 },
      { $project: { original_title: "$movie.originalTitle", avg: "$avg", _id: 0 } }
    ]).exec();
  }
}