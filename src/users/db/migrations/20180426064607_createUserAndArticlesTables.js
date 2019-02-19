
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('firstName');
    table.string('lastName');
    table.string('email');
    table.string('password');
    table.string('kindleEmail');
  }).then(function(){
    return knex.schema.createTable('articles', function(table){
      table.increments('id');
      table.string('URL');
      table.integer('user_id').references('users.id');
    });
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles').then(function(){
    return knex.schema.dropTable('users');
  });
};
