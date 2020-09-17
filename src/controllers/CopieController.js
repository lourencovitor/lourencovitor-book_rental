const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const copies = await knex("copies")
        .join("books", "books.id", "=", "copies.book_id")
        .select(
          "copies.*",
          "books.title as book_title",
          "books.author as book_author"
        )
        .where({ "copies.deleted_at": null });
      return res.json(copies);
    } catch (error) {
      next(error);
    }
  },
  async store(req, res, next) {
    try {
      const { book_id, isbn } = req.body;
      await knex("copies").insert({ book_id, isbn });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const copie = await knex("copies")
        .where({ "copies.id": id })
        .join("books", "books.id", "=", "copies.book_id")
        .select(
          "copies.*",
          "books.title as book_title",
          "books.author as book_author"
        )
        .where({ "copies.deleted_at": null });
      return res.json(copie);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { book_id, isbn } = req.body;
      await knex("copies").update({ book_id, isbn }).where({ id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const deleted_at = new Date();
      await knex("copies").update({ deleted_at }).where({ id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
};
