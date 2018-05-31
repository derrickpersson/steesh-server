const bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(11);

module.exports = function makeDataHelpers(db) {
  return {
    insertUser: function(userData){
      let {firstName, lastName, email, kindleEmail, password } = userData;
      bcrypt.hash(password, salt, null, function(err, hash) {
        if(err) return err;
        let password = hash;
      }).then(function(err){
        return db('users').insert({
          firstName: firstName,
          lastName: lastName,
          email: email,
          kindleEmail: kindleEmail,
          password: password
        });
      })

    },
    getUserByEmail: function(email) {
      return db.select("*").from('users').where('email', email);
    }
  }
}
