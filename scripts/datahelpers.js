module.exports = function makeDataHelpers(db) {
  return {
    insertUser: async function(userData){
      let {firstName, lastName, email, kindleEmail } = userData;
      const users = await db('users').returning('id').insert({
        firstName: firstName,
        lastName: lastName,
        email: email,
        kindleEmail: kindleEmail
      });
      console.log(users);
      return users[0];
    },
    getUserByID: async function(id) {
      const users = await db.select("*").from('users').where('id', id);
      return users[0];
    }
  }
}
