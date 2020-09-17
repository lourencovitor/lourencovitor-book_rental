exports.up = function (knex) {
  return knex.schema.createTable("addresses", (table) => {
    table.increments("id");
    table.string("zip_code");
    table.string("district");
    table.string("state");
    table.string("city");
    table.string("complement");
    table.integer("number");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").defaultTo(null);
  });
};

exports.down = (knex) => knex.schema.dropTable("addresses");
