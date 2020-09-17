const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const books = await knex("books").where({ deleted_at: null });
      return res.json(books);
    } catch (error) {
      next(error);
    }
  },
  async store(req, res, next) {
    try {
      const { title, author } = req.body;
      await knex("books").insert({ title, author });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const book = await knex("books")
        .where({ id })
        .where({ deleted_at: null });
      return res.json(book);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, author } = req.body;
      await knex("books").update({ title, author }).where({ id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const deleted_at = new Date();
      await knex("books").update({ deleted_at }).where({ id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
};
