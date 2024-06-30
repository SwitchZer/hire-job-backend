const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  addHire,
  getHireRecruiter,
  getHireWorkers,
} = require("../controller/hire");
const route = express.Router();

route.post("/", protect, addHire);
route.get("/recruiters", protect, getHireRecruiter);
route.get("/workers", protect, getHireWorkers);

module.exports = route;
