const db = require('../../db/dbPostgresql.js');
const userControllers = {};

userControllers.findPartner = async (req, res, next) => {
  //should have target user's email in req.boy => req.body.partnerEmail
  const { partnerEmail } = req.body;
  // console.log('L8 id:', id, 'EXPECT id of 7');
  const targetUser = await db.getUserByEmail(partnerEmail);
  // console.log('targetUser:', targetUser);
  // console.log('L8 findPartner:', req.body);
  // console.log('L9 findPartner:', req.body.partnerEmail);

  //if targetUser not exists
  if (!targetUser) {
    //send a message back to frontend
    const message =
      'Your partner is not signed up yet. Please ask your partner to sign up first!';
    return res.status(200).send(message);
  } else if (targetUser.has_partner === true) {
    //if the target user already connect with someone else
    const message =
      'The user you try to connect with already has a partner. Please try another user!';
    return res.status(200).send(message);
  } else {
    //if the targetUser exists and does not have a partner yet, proceed to the next middleware (connectPartner)
    res.locals.partner = targetUser;
    // console.log('inside findPartner: ', res.locals.partner);
    return next();
  }
};

userControllers.connectPartner = async (req, res, next) => {
  //need to have current logged in user info in the req.body?
  //console.log(req.body);
  //should have access to the target user info in res.locals.partner
  // console.log('inside connectPartner: ', res.locals.partner);
  try {
    // const currUserId = req.body.id;
    const { id, partnerEmail } = req.body;
    // console.log('L39', currUserId, 'should still be 7');
    const targetUserId = res.locals.partner.id;
    // console.log('targetUserId, expect id of 12', targetUserId);
    const data = await db.connectPartner(id, targetUserId, partnerEmail);
    // console.log('data', data);
    data[1].forEach((obj) => {
      if (obj.email === partnerEmail) {
        res.locals.partner = obj;
      }
    });
    // res.locals.partner.has_partner = { data}
    // console.log('inside userControllers.connectPartner', data);
    return next();
  } catch (err) {
    console.log('middleware userController.connectPartner ERROR ', err);
    return next(err);
  }
};

//this middleware function will disconnect two users if they break up with each other...
userControllers.breakupWithPartner = async (req, res, next) => {};

userControllers.incrementPage = async (req, res, next) => {
  const { page, id } = req.body;
  try {
    await db.incrementPage(page + 1, id);
    return next();
  } catch (err) {
    console.log('userControllers.incrementPage ERROR:', err);
    return next(err);
  }
};

module.exports = userControllers;
