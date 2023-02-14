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

  db.createLikedMovies = async (userId, movieId) => {
    console.log('IM INSIDE?!?!?')
    //current left off here changed db table name here to reflect store
    const sql = `INSERT INTO movie_likes (user_id, movie_id) VALUES (${userId}, ${movieId})`;

    const data = await pgQuery(sql);
    console.log(data);
    //Need to test data before continuing
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
  console.log(args);
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
    return data.rows[0]._id;
  } catch (err) {
    console.log('createUser', err);
  }
};

db.getUser = async (sub) => {
  try {
    const sql = `SELECT * 
    FROM Users
    WHERE Users.sub=$1`;
    const data = await pgQuery(sql, [sub]);
    if (data.rows.length === 0) {
      return null;
    } else if (data.rows.length === 1) {
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
