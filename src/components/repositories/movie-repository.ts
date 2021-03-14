import {  MovieModel } from './../models/movie';
import { MovieRatingModel } from './../models/movie-rating';
import { RatedTopResult, Movie, MovieRating } from './../../interfaces';

export class MovieRepository {

  async addMovie(data: Movie): Promise<void> {
    const newItem = new MovieModel();
    newItem.id = data.id;
    newItem.originalTitle = data.originalTitle;
    await newItem.save();
  }

  async addMovieRating(data: MovieRating): Promise<void>  {
    const newItem = new MovieRatingModel();
    newItem.movieId = data.movieId;
    newItem.rating = data.rating;
    await newItem.save();
  }

  async getTopRated(): Promise<RatedTopResult[]>  {
    return await MovieRatingModel.aggregate([
      {
        $group: {
          _id: '$movieId',
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
      { $project: { originalTitle: "$movie.originalTitle", avg: "$avg", _id: 0 } }
    ]).exec();
  }
}