const ENV = process.env.ENV || "development";
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[ENV]);
const userService = makeUserService(knex);
const knexLogger = require('knex-logger');

function makeUserService(db) {
  return {
    insertUser: async function(userData){
      let {firstName, lastName, email, kindleEmail } = userData;
      const users = await db('users').returning('id').insert({
        firstName: firstName,
        lastName: lastName,
        email: email,
        kindleEmail: kindleEmail
      });
      return users[0];
    },
    getUserByID: async function(id) {
      const users = await db.select("*").from('users').where('id', id);
      return users[0];
    }
  }
}

module.exports = {
  userService,
  knexLogger: knexLogger(knex),
}
