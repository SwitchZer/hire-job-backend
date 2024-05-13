const express = require("express");
const { protect, checkRole } = require("../middlewares/auth");
const {
  addHire,
  getHireRecruiter,
  getHireWorkers,
} = require("../controller/hire");
const route = express.Router();

route.post("/", protect, checkRole("recruiter"), addHire);
route.get("/recruiters", protect, checkRole("recruiter"), getHireRecruiter);
route.get("/workers", protect, checkRole("worker"), getHireWorkers);

module.exports = route;
