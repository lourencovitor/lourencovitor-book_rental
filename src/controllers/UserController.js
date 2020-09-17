const knex = require("../database");
const md5 = require("crypto-md5");

module.exports = {
  async index(req, res, next) {
    try {
      const users = await knex("users")
        .join("roles", "roles.id", "=", "users.role_id")
        .join("addresses", "addresses.id", "=", "users.address_id")
        .select(
          "users.*",
          "roles.name as role",
          "addresses.zip_code as address_zip_code",
          "addresses.district as address_district",
          "addresses.state as address_state",
          "addresses.city as address_city",
          "addresses.complement as address_complement",
          "addresses.number as address_number"
        )
        .where({ "users.deleted_at": null });
      return res.json(users);
    } catch (error) {
      next(error);
    }
  },
  async store(req, res, next) {
    try {
      const {
        name,
        role_id,
        birth_date,
        cpf,
        email,
        password,
        address,
      } = req.body;
      const address_id = await knex("addresses").insert({
        zip_code: address.zip_code,
        district: address.district,
        state: address.state,
        city: address.city,
        complement: address.complement,
        number: address.number,
      });

      const hash = md5(password, "hex");
      await knex("users").insert({
        name,
        birth_date,
        cpf,
        email,
        password: hash,
        role_id: role_id ? role_id : 2,
        address_id,
      });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;
      const role = await knex("users")
        .where({ "users.id": id })
        .join("roles", "roles.id", "=", "users.role_id")
        .join("addresses", "addresses.id", "=", "users.address_id")
        .select(
          "users.*",
          "roles.name as role",
          "addresses.zip_code as address_zip_code",
          "addresses.district as address_district",
          "addresses.state as address_state",
          "addresses.city as address_city",
          "addresses.complement as address_complement",
          "addresses.number as address_number"
        )
        .where({ "users.deleted_at": null });
      return res.json(role);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        role_id,
        birth_date,
        cpf,
        email,
        password,
        address,
      } = req.body;
      await knex("addresses")
        .update({
          zip_code: address.zip_code,
          district: address.district,
          state: address.state,
          city: address.city,
          complement: address.complement,
          number: address.number,
        })
        .where({ id: address.id });

      const hash = md5(password, "hex");
      await knex("users")
        .update({
          name,
          birth_date,
          cpf,
          email,
          password: hash,
        })
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
      await knex("users").update({ deleted_at }).where({ id });
      return res.send();
    } catch (error) {
      next(error);
    }
  },
};
