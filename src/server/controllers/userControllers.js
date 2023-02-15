const db = require('../../db/dbPostgresql.js');
const userControllers = {};


userControllers.findPartner = async (req, res, next) => {
  //should have target user's email in req.boy => req.body.partnerEmail
  const targetUser = await db.getUserByEmail(req.body.partnerEmail);

  //if targetUser not exists
  if (!targetUser) {
    //send a message back to frontend
    const message = 'Your partner is not signed up yet. Please ask your partner to sign up first!';
    res.status(200).send(message);
  } else if ( targetUser.has_partner === true ){
    //if the target user already connect with someone else
    const message = 'The user you try to connect with already has a partner. Please try another user!';
    res.status(200).send(message);
  } else {
    //if the targetUser exists and does not have a partner yet, proceed to the next middleware (connectPartner)
    res.locals.partner = targetUser
    // console.log('inside findPartner: ', res.locals.partner)
    next()
  }
}

userControllers.connectPartner = async (req, res, next) => {
  //need to have current logged in user info in the req.body?
  //console.log(req.body);
  //should have access to the target user info in res.locals.partner
  //console.log('inside connectPartner: ', res.locals.partner);
  try {
    const currUserId = req.body.id;
    const targetUserId = res.locals.partner.id;
    const data = await db.connectPartner(currUserId, targetUserId)
    console.log('inside userControllers.connectPartner', data)
    next()
  } catch (err) {
    console.log('middleware userController.connectPartner ERROR ', err);
    return next(err)
  }

}

//this middleware function will disconnect two users if they break up with each other...
userControllers.breakupWithPartner = async (req, res, next) => {

}


userControllers.incrementPage = async (req, res, next) => {
  const { page, id } = req.body;
  try {
    await db.incrementPage(page + 1, id);
    return next();
  } catch(err) {
    console.log('userControllers.incrementPage ERROR:', err);
    return next(err);
  }
};


module.exports = userControllers;