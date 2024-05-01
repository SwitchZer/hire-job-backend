const express = require("express");
const {
  getWorkers,
  postWorkers,
  putWorkers,
  deleteWorkers,
  getidWorkers,
} = require("../../controller/workers/workers");
const route = express.Router();

route
  .get("/", getWorkers)
  .post("/", postWorkers)
  .put("/:id", putWorkers)
  .delete("/:id", deleteWorkers)
  .get("/:id", getidWorkers);

module.exports = route;
