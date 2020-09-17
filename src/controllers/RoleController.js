const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const roles = await knex("roles").where({ deleted_at: null });
      return res.json(roles);
    } catch (error) {
      next(error);
    }
  },
  async store(req, res, next) {
    try {
      const { name } = req.body;
      await knex("roles").insert({ name });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const role = await knex("roles")
        .where({ id })
        .where({ deleted_at: null });
      return res.json(role);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const role = await knex("roles").update({ name }).where({ id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const deleted_at = new Date();
      await knex("roles").update({ deleted_at }).where({ id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
};
