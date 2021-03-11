import mongoose from 'mongoose';

export interface IMovieModel extends mongoose.Document {
  id: String;
  originalTitle: String;
};

export const MovieModel = mongoose.model<IMovieModel>('movie', new mongoose.Schema({
  id: String,
  originalTitle: String
}))


