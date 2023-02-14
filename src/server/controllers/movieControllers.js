const {api_key} = require('../../../secrets.js')
const db = require('../../db/dbPostgresql.js')
const axios = require('axios')


const movieControllers = {};


movieControllers.getMovies = async (req, res, next) => {
  // console.log('is user info available in req.body? ', req.body);
  // console.log('is user info available in req.user? ', req.user);
  //for now the page default to 1
  //later maybe try to randomize it or read from users.page
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`
  
    const response = await axios.get(url);
    
    // filter through the movie info array to only send necessary info to frontend
    const filtered = []
    response.data.results.forEach(el => {
       //destructuring from each el
       const { id, original_language, overview, popularity, poster_path, release_date, title, vote_average } = el;
       filtered.push({
         id, 
         original_language,
         overview,
         popularity,
         poster_path,
         release_date,
         title,
         vote_average,
       })
    })
    // console.log('is data filtered? ', filtered)
    res.locals.results = filtered;
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
    console.log(req.body);
    const createdMovie = await db.createLikedMovies(userId, movieId);
    res.locals.createdMovie = createdMovie;
    next();
  } catch(err) {
    console.log('ERROR in movieController.createLikedMovies: ', err);
    next(err);
  }
}

module.exports = movieControllers;
