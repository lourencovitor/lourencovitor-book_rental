const knex = require("../database");

module.exports = {
  async store(req, res, next) {
    try {
      const { user_id, delivery_date } = req.body;
      const rent_controls = await knex("rent_controls")
        .where({ user_id })
        .where({ deleted_at: null });
      if (rent_controls) {
        const date_delivery_date = new Date(delivery_date);
        const date_return_date = new Date(rent_controls[0].return_date);
        if (date_delivery_date > date_return_date) {
          const user = await knex("users")
            .where({ id: user_id })
            .where({ deleted_at: null });
          let penalties = user[0].penalties;
          penalties++;
          await knex("rent_controls")
            .update({ delivery_date })
            .where({ id: rent_controls[0].id });
          await knex("copies")
            .update({ status: "available" })
            .where({ id: rent_controls[0].copie_id });
          await knex("users").update({ penalties }).where({ id: user_id });
        } else {
          await knex("rent_controls")
            .update({ delivery_date })
            .where({ id: rent_controls[0].id });
        }
      } else {
        return res.status(404).json({ message: "person not found " });
      }
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
};
