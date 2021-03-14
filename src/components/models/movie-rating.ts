import mongoose from 'mongoose';
import { MovieRating } from './../../interfaces';

interface MovieRatingDocument extends mongoose.Document, MovieRating { }

export const MovieRatingModel = mongoose.model<MovieRatingDocument>('movie_rating', new mongoose.Schema({
  movie_id: String,
  rating: Number
}));