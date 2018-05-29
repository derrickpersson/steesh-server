const bcrypt = require('bcrypt');

module.exports = function makeDataHelpers(db) {
  return {
    insertUser: function(userData){
      return db.insert(userData);
    },
    getUserByEmail: function(email) {
      return db.select("*").from('users').where('email', email);
    }
  }
}
