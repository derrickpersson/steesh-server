module.exports = function makeDataHelpers(db) {
  return {
    insertUser: function(userData){
      let {firstName, lastName, email, kindleEmail, password } = userData;
      return db('users').insert({
        firstName: firstName,
        lastName: lastName,
        email: email,
        kindleEmail: kindleEmail,
        password: password
      });
    },
    getUserByEmail: function(email) {
      return db.select("*").from('users').where('email', email);
    }
  }
}
