exports.up = function (knex) {
  return knex.schema.createTable("copies", (table) => {
    table.increments("id");
    table
      .integer("book_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("books");
    table.string("isbn", 13);
    table.unique(["isbn"]);
    table
      .enu("status", ["available", "unavailable"])
      .notNullable()
      .defaultTo("available");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").defaultTo(null);
  });
};

exports.down = (knex) => knex.schema.dropTable("copies");
