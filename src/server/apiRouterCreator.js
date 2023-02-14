const express = require('express');
const movieControllers = require('./controllers/movieControllers.js');


const apiRouterCreator = function (db) {
  const router = express.Router();
  // router.post('/db', async (req, res) => {
  //   const rn = await db.getCards();
  //   res.status(200).send(rn);
  // });
  

  //endpoint for fetch the initial 20 movies?
  router.post('/getMovies', movieControllers.getMovies, (req, res) => {
    res.status(200).send(res.locals.results)
  })

  router.post('/likedMovies', movieControllers.createLikedMovies, (req, res) => {
    res,status(200).json(res.locals.createdMovie);
  })


  return router;
};

module.exports = { apiRouterCreator };
