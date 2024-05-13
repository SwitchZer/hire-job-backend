const express = require("express");
const { protect, checkRole } = require("../middlewares/auth");
const {
  addExperience,
  getProfileExperience,
  deleteExperience,
  getExperienceIdWorkers,
  putExperience,
} = require("../controller/experience");

const route = express.Router();

route.post("/", protect, checkRole("worker"), addExperience);
route.get("/", checkRole("worker"), protect, getProfileExperience);
route.delete("/:id", protect, checkRole("worker"), deleteExperience);
route.get("/:id", protect, getExperienceIdWorkers);
route.put("/:id", protect, checkRole("worker"), putExperience);

module.exports = route;
