const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  addPortofolio,
  getProfilePortofolio,
  getPortofolioIdWorkers,
  putPortofolio,
  deletePortofolio,
} = require("../controller/portofolio");

const route = express.Router();

route.post("/", protect, addPortofolio);
route.get("/", protect, getProfilePortofolio);
route.delete("/:id", protect, deletePortofolio);
route.get("/:id", protect, getPortofolioIdWorkers);
route.put("/:id", protect, putPortofolio);

module.exports = route;
