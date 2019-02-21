require('dotenv').config();

module.exports = {

  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: process.env.DB_CLIENT, 
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    }
  }

};
