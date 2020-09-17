const express = require("express");
const routes = express.Router();
const RoleController = require("./controllers/RoleController");
const UserController = require("./controllers/UserController");
const BookController = require("./controllers/BookController");
const CopieController = require("./controllers/CopieController");

routes.get("/roles", RoleController.index);
routes.post("/roles", RoleController.store);
routes.get("/roles/:id", RoleController.show);
routes.put("/roles/:id", RoleController.update);
routes.delete("/roles/:id", RoleController.destroy);

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

routes.get("/books", BookController.index);
routes.post("/books", BookController.store);
routes.get("/books/:id", BookController.show);
routes.put("/books/:id", BookController.update);
routes.delete("/books/:id", BookController.destroy);

routes.get("/copies", CopieController.index);
routes.post("/copies", CopieController.store);
routes.get("/copies/:id", CopieController.show);
routes.put("/copies/:id", CopieController.update);
routes.delete("/copies/:id", CopieController.destroy);

module.exports = routes;
