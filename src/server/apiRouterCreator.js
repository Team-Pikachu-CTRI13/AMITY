const express = require('express');


const apiRouterCreator = function (db) {
  const router = express.Router();
  // router.post('/db', async (req, res) => {
  //   const rn = await db.getCards();
  //   res.status(200).send(rn);
  // });

  // router.get('/getMovies', async (req, res) => {
  //   const rn = 
  // })


  return router;
};

module.exports = { apiRouterCreator };
