const express = require("express");
const routes = express.Router();
const AuthController = require("./controllers/AuthController");
const RoleController = require("./controllers/RoleController");
const UserController = require("./controllers/UserController");
const BookController = require("./controllers/BookController");
const CopieController = require("./controllers/CopieController");
const RentalControlController = require("./controllers/RentalControlController");
const DeliveryController = require("./controllers/DeliveryController");
const AdminAuth = require("./middleware/AdminAuth");

routes.post("/login", AuthController.store);

routes.get("/roles", RoleController.index);
routes.post("/roles", RoleController.store);
routes.get("/roles/:id", RoleController.show);
routes.put("/roles/:id", RoleController.update);
routes.delete("/roles/:id", RoleController.destroy);

routes.get("/users", AdminAuth, UserController.index);
routes.post("/users", UserController.store);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", AdminAuth, UserController.destroy);

routes.get("/books", AdminAuth, BookController.index);
routes.post("/books", AdminAuth, BookController.store);
routes.get("/books/:id", AdminAuth, BookController.show);
routes.put("/books/:id", AdminAuth, BookController.update);
routes.delete("/books/:id", AdminAuth, BookController.destroy);

routes.get("/copies", AdminAuth, CopieController.index);
routes.post("/copies", AdminAuth, CopieController.store);
routes.get("/copies/:id", AdminAuth, CopieController.show);
routes.put("/copies/:id", AdminAuth, CopieController.update);
routes.delete("/copies/:id", AdminAuth, CopieController.destroy);

routes.get("/rent_control", AdminAuth, RentalControlController.index);
routes.post("/rent_control", AdminAuth, RentalControlController.store);
routes.get("/rent_control/:id", AdminAuth, RentalControlController.show);
routes.put("/rent_control/:id", AdminAuth, RentalControlController.update);
routes.delete("/rent_control/:id", AdminAuth, RentalControlController.destroy);

routes.post("/delivery", AdminAuth, DeliveryController.store);

module.exports = routes;
