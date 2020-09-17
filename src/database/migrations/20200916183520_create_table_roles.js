exports.up = (knex) => {
  return knex.schema.createTable("roles", (table) => {
    table.increments("id");
    table.string("name");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").defaultTo(null);
  });
};

exports.down = (knex) => knex.schema.dropTable("roles");
