const { Pool } = require('pg');
const { PG_URI, DEBUG } = require('../../secrets.js');

/*
pqQuery implements functionality to run a parameterized sql query on a
postgreSQL database specified by PG_URI. Pool keeps connection open for
some period of time to assist pooling of queries. 
*/
const pool = new Pool({
  connectionString: PG_URI,
});
const pgQuery = (text, params, callback) => {
  console.log('INSIDE pgQuery!!!')
  if (DEBUG) {
    const sqlCommand = text.replace(/\$(\d+)/g, (match, index) => {
      return typeof params[index - 1] === 'string'
        ? `\'${params[index - 1]}\'`
        : params[index - 1];
    });
    console.log('running sql command: ', sqlCommand);
  }
  return pool.query(text, params, callback);
};

/*
db object creates sql commands and sends them to database, then
returns output to backend
*/
const db = { pool }; // pool can be used to forcibly disconnect
  /*
    const arr = [
      args['sub'],
      args['picture'],
      args['email'],
    ];
    const sql = `INSERT INTO Users
      (sub, picture, email, page)
      VALUES ($1, $2, $3, 1)
      RETURNING *;`;
    const data = await pgQuery(sql, arr);
  */
  db.createLikedMovies = async function(userId, movieId) {
    try {
      //checks to see if movieId already exists for user
      const check = `SELECT * FROM Movie_likes
      WHERE user_id=${userId} AND movie_id=${movieId};`;
      const checker = await pgQuery(check);

      const sql = `INSERT INTO Movie_likes
        (user_id, movie_id)
        VALUES (${userId}, ${movieId})
        RETURNING *;`;
        //if movieId doesn't exist then create it.
      const data = checker.rows[0] ?? await pgQuery(sql);
      // console.log('DATA: ', data.rows);
    } catch (err) {
      console.log('db.createLikedMovies ERROR:', err);
    }


  }

//this function will look for the user by its email in our user table
//if target user exists,proceed to the next middleware (possibly connect two users)
//if not exits, should send back message to frontend
db.getUserByEmail = async function(email) {
  try {
    const query = `SELECT * FROM Users WHERE email=${email};`;
    const targetUser = await pgQuery(query);
    console.log(targetUser.rows);
    return
  } catch (err) {
    console.log('getUserByEmail ERROR', err)
  }
}

// db.getTables = async () => {
//   const sql = 'SELECT * FROM information_schema.tables;';
//   const data = await pgQuery(sql);
//   return data.rows;
// };

// db.getCards = async () => {
//   const sql = 'SELECT * FROM cards';
//   const data = await pgQuery(sql);
//   return data.rows;
// };

db.createUser = async (args) => {
  // console.log(args);
  try {
    const arr = [
      args['sub'],
      args['picture'],
      args['email'],
    ];
    const sql = `INSERT INTO Users
      (sub, picture, email, page)
      VALUES ($1, $2, $3, 1)
      RETURNING *;`;
    const data = await pgQuery(sql, arr);
    console.log(data.rows);
    return data.rows[0];
  } catch (err) {
    console.log('createUser', err);
  }
};

db.getUser = async (sub) => {
  try {
    const sql = `SELECT * FROM Users
      WHERE Users.sub=$1`;
    const data = await pgQuery(sql, [sub]);
    if (data.rows.length === 0) {
      return null;
    } else if (data.rows.length === 1) {
      console.log('inside db.getUser: ', data.rows[0].id)
      console.log('inside db.getUser: ', data.rows[0])
      return data.rows[0];
    } else {
      throw `db.getUser: more than one user found with sub ${sub} (found ${data.rows.length})`;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

module.exports = db;
