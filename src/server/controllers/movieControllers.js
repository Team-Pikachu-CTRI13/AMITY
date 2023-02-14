const {api_key} = require('../../../secrets.js')
const db = require('../../db/dbPostgresql.js')
const axios = require('axios');

const movieControllers = {};


movieControllers.getMovies = (req, res, next) => {
  //console.log(req.body);
  //need the sub from the user state in the frontend
  const {sub} = req.body

//   const userInfo = db.getUser(sub);
//   const pageNum = userInfo.page;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  
  //fetch for movie data
  axios.get(url)
    .then(response => {
        // response.json();
        // console.log(response.data);
        //need to send the res to the next middleware or send it directly to the frontend
        // res.locals.results = response.data.results;
        next()
    })
    .catch(err => {
        // console.log(err);
        next(err)
    })
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
