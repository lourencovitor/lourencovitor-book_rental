// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      user: "root",
      password: "positivo20",
      database: "book_rental_test",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`,
    },
  },
};
