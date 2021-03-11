import mongoose from 'mongoose';

export interface IMovieRating extends mongoose.Document {
  movie_id: String;
  rating: Number;
};

export const MovieRatingModel = mongoose.model<IMovieRating>('movie_rating', new mongoose.Schema({
  movie_id: String,
  rating: Number
}));