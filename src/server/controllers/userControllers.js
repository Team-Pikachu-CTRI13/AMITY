const db = require('../../db/dbPostgresql.js')
const userControllers = {};


userControllers.connectPartner = (req, res, next) => {
  console.log(req.body.partnerEmail);
//   db.getUserByEmail(req.body.partnerEmail)
  next()
}


userControllers.incrementPage = (req, res, next) => {

}

userControllers.getLikedMovies = (req, res, next) => {

}


module.exports = userControllers;