const express = require("express");
const {
  getWorkers,
  postWorkers,
  putWorkers,
  deleteWorkers,
  getidWorkers,
  profileWorkers,
} = require("../controller/workers");
const { protect, checkRole } = require("../middlewares/auth");
const route = express.Router();

route
  .get("/", protect, getWorkers)
  .post("/register", postWorkers)
  .put("/users/:id", checkRole("worker"), protect, putWorkers)
  .delete("/users/:id", protect, deleteWorkers)
  .get("/users/:id", protect, getidWorkers)
  .get("/profile", protect, checkRole("worker"), profileWorkers);

module.exports = route;
