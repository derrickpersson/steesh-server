module.exports = function makeDataHelpers(db) {
  return {
    insertUser: function(userData){
      let {firstName, lastName, email, kindleEmail, password } = userData;
      return db('users').returning('id').insert({
        firstName: firstName,
        lastName: lastName,
        email: email,
        kindleEmail: kindleEmail,
        password: password
      });
    },
    getUserByID: function(id) {
      return db.select("*").from('users').where('id', id);
    }
  }
}
