const express = require('express');
const movieControllers = require('./controllers/movieControllers.js');
const userControllers = require('./controllers/userControllers.js');


const apiRouterCreator = function (db) {
  const router = express.Router();
  // router.post('/db', async (req, res) => {
  //   const rn = await db.getCards();
  //   res.status(200).send(rn);
  // });
  

  //endpoint for fetch the initial 20 movies?
  router.post('/getMovies', movieControllers.getMovies, (req, res) => {
    res.status(200).send(res.locals.results);
  })

  router.post('/likedMovies', movieControllers.createLikedMovies, (req, res) => {
    res.status(200).json(res.locals.createdMovie);
  })

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
