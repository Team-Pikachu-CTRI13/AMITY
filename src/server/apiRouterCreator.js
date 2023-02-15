const express = require('express');
const movieControllers = require('./controllers/movieControllers.js');
const userControllers = require('./controllers/userControllers.js');


const apiRouterCreator = function (db) {
  const router = express.Router();

  //endpoint for fetch the initial 20 movies?
  router.post('/getMovies',
   movieControllers.getMovies,
  //  userControllers.incrementPage,
   (req, res) => {
    res.status(200).send(res.locals.results);
  })

  router.post('/likedMovies', movieControllers.createLikedMovies, (req, res) => {
    res.status(200).send(res.locals.createdMovie);
  })


  //this route is for initially find and connect partner
  //will send back the partner's info (with all user info) in response
  router.post('/connect', userControllers.findPartner, userControllers.connectPartner, (req, res) => {
    res.status(200).send(res.locals.partner);
  })

  router.get(
    '/matchedMovies',
    movieControllers.matchedMovies,
    movieControllers.getMoviesByIds,
    (req, res) => {
    res.status(200).json(res.locals.matchedMovies);
  });


  return router;
};

module.exports = { apiRouterCreator };
