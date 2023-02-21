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
  // console.log('INSIDE pgQuery!!!');
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

  //creates new entry with liked movies for each user
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

  //pulls all movies liked by both partners
  db.matchedMovies = async function (user, partner) {
    const sql = `SELECT aliasA.movie_id
      FROM movie_likes aliasA
      JOIN movie_likes aliasB ON aliasA.movie_id=aliasB.movie_id
      WHERE aliasA.user_id=${user} AND aliasB.user_id=${partner};`;
    const gotmovies = await pgQuery(sql);
    return gotmovies.rows;
  };

//this function will look for the user by its email in our user table
//if target user exists,return the targetUser info; if not exists, the returned value should be undefined
db.getUserByEmail = async function(email) {

  try {
    const query = `SELECT * FROM Users WHERE email=\'${email}\';`;
    const data = await pgQuery(query);
    // console.log('getUserByEmail', data.rows);
    if (data.rows.length === 0) {
      return null;
    } else if (data.rows.length === 1) {
      return data.rows[0];
    } else {
      throw `db.getUserByEmail: more than one user found with email ${email} (found ${data.rows.length})`;
    }
  } catch (err) {
    console.log('db.getUserByEmail ERROR', err);
    return undefined;
  }
}

//this function will create a match for 2 users
db.connectPartner = async function(currUserId, targetUserId) {
  const arr = [currUserId, targetUserId];
  // console.log('in connect partner!')
  try {
    //this query is going to write matched users data into the Matches table
    const query = `INSERT INTO Matches (user1, user2) VALUES ($1, $2) RETURNING *;`;
    const data = await pgQuery(query, arr);
    // console.log('inside db.connectPartner', data.rows);

    //this query2 is going to update the hasPartner field in User table to true because both users now have partners
    const query2 = `UPDATE Users SET has_partner = true WHERE id=$1 OR id=$2 RETURNING *;`
    const data2 = await pgQuery(query2, arr);
    // console.log('did we update two connected users has_partner to true? ', data2.rows)

    if (data.rows.length === 0) {
      return null;
    } else if (data.rows.length === 1 && data2.rows.length === 2) {
      return [data.rows[0], data2.rows];
    } else {
      throw `db.connectPartner ERROR`;
    }
  } catch (err) {
    console.log('db.connectPartner ERROR', err);
    return undefined;
  }
}

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
    console.log('DATA ROWS: L125', data.rows[0]);
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
      // console.log('L152', data.rows[0]);
      return data.rows[0];
    } else {
      throw `db.getUser: more than one user found with sub ${sub} (found ${data.rows.length})`;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

db.incrementPage = async function(page, id) {
  try {
    const sql = `UPDATE Users
      SET page=${page}
      WHERE id=${id}
      RETURNING *;`;
    const pageNum = await pgQuery(sql);
    return pageNum.rows[0];
    // console.log('L158 pageNum:', pageNum.rows[0]);
  } catch(err) {
    console.log('db.incrementPage:', err);
  }
};


module.exports = db;
