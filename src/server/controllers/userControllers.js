const db = require('../../db/dbPostgresql.js')
const userControllers = {};


userControllers.findPartner = (req, res, next) => {
  //should have target user's email in req.boy => req.body.partnerEmail
  const targetUser = db.getUserByEmail(req.body.partnerEmail);

  //if targetUser not exists
  if (!targetUser) {
    //send a message back to frontend
    const message = 'Your partner is not signed up yet. Please ask your partner to sign up first!'
    res.status(200).send(message)
  } else {
    //if the targetUser exists, proceed to the next middleware (connectPartner)
    next()
  }
}


userControllers.incrementPage = (req, res, next) => {

}

userControllers.getLikedMovies = (req, res, next) => {

}


module.exports = userControllers;