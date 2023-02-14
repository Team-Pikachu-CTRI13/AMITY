const {api_key} = require('../../../secrets.js')
const db = require('../../db/dbPostgresql.js')
const axios = require('axios')


const movieControllers = {};


movieControllers.getMovies = async (req, res, next) => {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    // console.log(api_key);
    const response = await axios.get(url);
    // console.log(response.data);
    res.locals.results = response.data;
    return next();
  } catch (err) {
    console.log('getMovies ERROR');
    return next(err)
  }
}

movieControllers.createLikedMovies = async (req, res, next) => {
  //should retrieve userId and movieId from req.body and pass it to db.createLikedMovies
  try {
    const {userId, movieId} = req.body;
    const createdMovie = await db.createLikedMovies(userId, movieId);
    res.locals.createdMovie = createdMovie;
    next();
  } catch(err) {
    console.log('ERROR in movieController.createLikedMovies: ', err);
    next(err);
  }
}

module.exports = movieControllers;
