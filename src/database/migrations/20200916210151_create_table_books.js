exports.up = function (knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments("id");
    table.string("title");
    table.string("author");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").defaultTo(null);
  });
};

exports.down = (knex) => knex.schema.dropTable("books");
