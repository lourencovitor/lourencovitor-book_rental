const knex = require("../database");
const jwt = require("jsonwebtoken");
const md5 = require("crypto-md5");
require("dotenv/config");

module.exports = {
  async store(req, res, next) {
    try {
      const { email, password } = req.body;
      const user_password = md5(password, "hex");
      const user = await knex("users")
        .where({ email })
        .where({ password: user_password })
        .join("roles", "roles.id", "=", "users.role_id")
        .select("users.*", "roles.name as role")
        .where({ "users.deleted_at": null });
      const token = jwt.sign(
        { email: user[0].email, role: user[0].role_id },
        process.env.SECRET_API,
        { expiresIn: "12h" }
      );
      const data = { name: user[0].name, email: user[0].email };
      return res.json({ token, ...data });
    } catch (error) {
      next(error);
    }
  },
};
