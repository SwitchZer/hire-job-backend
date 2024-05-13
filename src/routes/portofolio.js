const express = require("express");
const { protect, checkRole } = require("../middlewares/auth");
const {
  addPortofolio,
  getProfilePortofolio,
  getPortofolioIdWorkers,
  putPortofolio,
  deletePortofolio,
} = require("../controller/portofolio");

const route = express.Router();

route.post("/", protect, checkRole("worker"), addPortofolio);
route.get("/", protect, checkRole("worker"), getProfilePortofolio);
route.delete("/:id", protect, checkRole("worker"), deletePortofolio);
route.get("/:id", protect, getPortofolioIdWorkers);
route.put("/:id", protect, checkRole("worker"), putPortofolio);

module.exports = route;
