exports.up = function (knex) {
  return knex.schema.createTable("rent_controls", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users");
    table
      .integer("copie_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("copies");
    table.date("pick_up_date");
    table.date("return_date");
    table.date("delivery_date").defaultTo(null);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").defaultTo(null);
  });
};

exports.down = (knex) => knex.schema.dropTable("rent_controls");
