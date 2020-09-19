exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table
      .integer("role_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("roles");
    table
      .integer("address_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("addresses");
    table.string("name");
    table.string("email");
    table.date("birth_date");
    table.string("cpf");
    table.string("password");
    table.integer("penalties").defaultTo(0);
    table.unique(["cpf"]);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").defaultTo(null);
  });
};

exports.down = (knex) => knex.schema.dropTable("users");
