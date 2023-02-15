const {api_key} = require('../../../secrets.js')
const db = require('../../db/dbPostgresql.js')
const axios = require('axios')


const movieControllers = {};


movieControllers.getMovies = async (req, res, next) => {
  // console.log('is user info available in req.body? ', req.body);
  // console.log('is user info available in req.user? ', req.user);
  //for now the page default to 1
  //later maybe try to randomize it or read from users.page
  const page = Math.floor(Math.random() * 5) + 1;
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`

    const response = await axios.get(url);

    // filter through the movie info array to only send necessary info to frontend
    const filtered = []
    response.data.results.forEach(el => {
       //destructuring from each el
       const { id, original_language, overview, popularity, poster_path, release_date, title, vote_average } = el;
       filtered.push({
         movieId: id,
         original_language,
         overview,
         popularity,
         poster_path,
         release_date,
         title,
         vote_average,
       })
    })

    res.locals.results = filtered;
    return next();
  } catch (err) {
    console.log('getMovies ERROR');
    return next(err)
  }
}


movieControllers.getMoviesByIds = async function(req, res, next) {
  try {
    const movieArr = res.locals.matchedMovies;
    // console.log('L48 movieArr:', movieArr, 'L48 movieArr');

    const getDetails = async function(movieId) {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`;
      const res = await axios.get(url);
      const { id, original_language, overview, popularity, poster_path, release_date, title, vote_average } = res.data;
      return { movieId: id, original_language, overview, popularity, poster_path, release_date, title, vote_average };
    };

    const results = [];
    for (let i = 0; i < movieArr.length; i++) {
      const { movie_id } = movieArr[i];
      results.push(await getDetails(movie_id));
    }
    res.locals.matchedMovies = results;
    return next();
  } catch(err) {
    console.log('getMoviesByIds', err);
    return next(err);
  }

};

movieControllers.createLikedMovies = async (req, res, next) => {
  //should retrieve userId and movieId from req.body and pass it to db.createLikedMovies
  console.log('is info in req.body? ', req.body);
  try {
    const { id, movieId } = req.body;
    // console.log(req.body);
    const createdMovie = await db.createLikedMovies(id, movieId);
    res.locals.createdMovie = createdMovie;
    return next();
  } catch(err) {
    console.log('ERROR in movieController.createLikedMovies: ', err);
    return next(err);
  }
}

movieControllers.matchedMovies = async function(req, res, next) {
  const {user, partner} = req.body;
  try {
    const matchedMovies = await db.matchedMovies(user, partner);
    res.locals.matchedMovies = matchedMovies;
    return next();
  } catch(err) {
    console.log('ERROR in movieControllers matchedMovies: ', err);
    return next(err);
  }
};

module.exports = movieControllers;
