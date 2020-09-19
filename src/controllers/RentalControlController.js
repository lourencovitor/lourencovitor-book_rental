const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const retal = await knex("rent_controls")
        .join("users", "users.id", "=", "rent_controls.user_id")
        .join("copies", "copies.id", "=", "rent_controls.copie_id")
        .join("books", "books.id", "=", "copies.book_id")
        .select(
          "rent_controls.*",
          "users.name as user_name",
          "users.email as user_email",
          "users.cpf as user_cpf",
          "copies.isbn as copie_isbn",
          "copies.status as copie_status",
          "books.title as book_title",
          "books.author as book_author"
        )
        .where({ "rent_controls.deleted_at": null });
      return res.json(retal);
    } catch (error) {
      next(error);
    }
  },
  async store(req, res, next) {
    try {
      const { user_id, copie_id, pick_up_date } = req.body;

      const copie_status = await knex("copies")
        .where({ id: copie_id })
        .where({ deleted_at: null });
      const user = await knex("users")
        .where({ id: user_id })
        .where({ deleted_at: null });
      if (user[0].penalties <= 2) {
        if (copie_status[0].status === "available") {
          await knex("copies")
            .update({ status: "unavailable" })
            .where({ id: copie_id });

          let return_date = new Date(pick_up_date);
          return_date.setDate(return_date.getDate() + 15);

          await knex("rent_controls").insert({
            user_id,
            copie_id,
            pick_up_date,
            return_date,
          });
          return res.status(201).send();
        } else {
          return res.status(404).json({ message: "copy not available" });
        }
      } else {
        return res
          .status(401)
          .json({ message: "User can no longer rent the books" });
      }
    } catch (error) {
      next(error);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const rental_control = await knex("rent_controls")
        .join("users", "users.id", "=", "rent_controls.user_id")
        .join("copies", "copies.id", "=", "rent_controls.copie_id")
        .join("books", "books.id", "=", "copies.book_id")
        .select(
          "rent_controls.*",
          "users.name as user_name",
          "users.email as user_email",
          "users.cpf as user_cpf",
          "copies.isbn as copie_isbn",
          "copies.status as copie_status",
          "books.title as book_title",
          "books.author as book_author"
        )
        .where("rent_controls.id", id)
        .where({ "rent_controls.deleted_at": null });
      return res.json(rental_control);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { user_id, copie_id, pick_up_date } = req.body;
      let return_date = new Date(pick_up_date);
      return_date.setDate(return_date.getDate() + 15);
      await knex("rent_controls")
        .update({ user_id, copie_id, pick_up_date, return_date })
        .where({ id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const deleted_at = new Date();
      await knex("rent_controls").update({ deleted_at }).where({ id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
};
