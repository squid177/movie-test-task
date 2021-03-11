import { Db } from './components/db';
import GoogleDriveCsvLoader from './components/google-drive-csv-loader';
import { MovieRatingReceiver } from './components/receivers/movie-rating-receiver';
import { MovieReceiver } from './components/receivers/movie-receiver';
import { MovieRepository } from './components/repositories/movie-repository';
import { RATINGS_FILE_ID, MOVIES_METADATA_FILE_ID } from './constants';
import { isUndefined } from './shared';
import { InvalidMongoConnectionUrlException, InvalidGoogleApiTokenException } from './exceptions';

const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;
const GOOGLE_API_TOKEN = process.env.GOOGLE_API_TOKEN;

(async function () {
  try {
    if (isUndefined(MONGO_CONNECTION_URL)) {
      throw new InvalidMongoConnectionUrlException();
    }

    if (isUndefined(GOOGLE_API_TOKEN)) {
      throw new InvalidGoogleApiTokenException();
    }

    const database = new Db(MONGO_CONNECTION_URL);
    await database.connect();

    const movieRepository = new MovieRepository();

    const movieReceiver = new MovieReceiver(movieRepository);
    const movieRatingReceiver = new MovieRatingReceiver(movieRepository);

    const csvLoader = new GoogleDriveCsvLoader(GOOGLE_API_TOKEN);

    await csvLoader.load(MOVIES_METADATA_FILE_ID, movieReceiver);
    await csvLoader.load(RATINGS_FILE_ID, movieRatingReceiver);

    const result = await movieRepository.getTopRated();

    console.log(`Result:`);
    console.log(result)
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
})();