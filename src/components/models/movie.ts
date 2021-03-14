import mongoose from 'mongoose';
import { Movie } from './../../interfaces';

interface MovieDocument extends mongoose.Document, Movie {
  id: string;
}

export const MovieModel = mongoose.model<MovieDocument>('movie', new mongoose.Schema({
  id: String,
  originalTitle: String
}))


