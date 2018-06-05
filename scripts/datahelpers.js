const bcrypt = require('bcrypt');

module.exports = function makeDataHelpers(db) {
  return {
    insertUser: function(userData){
      let {firstName, lastName, email, kindleEmail, password } = userData;
      bcrypt.hash(password, 12).then(function(hash){
        return db('users').insert({
          firstName: firstName,
          lastName: lastName,
          email: email,
          kindleEmail: kindleEmail,
          password: hash
        })        
      });
    },
    getUserByEmail: function(email) {
      return db.select("*").from('users').where('email', email);
    }
  }
}
