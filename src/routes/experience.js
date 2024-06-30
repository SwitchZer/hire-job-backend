const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  addExperience,
  getProfileExperience,
  deleteExperience,
  getExperienceIdWorkers,
  putExperience,
} = require("../controller/experience");

const route = express.Router();

route.post("/", protect, addExperience);
route.get("/", protect, getProfileExperience);
route.delete("/:id", protect, deleteExperience);
route.get("/:id", protect, getExperienceIdWorkers);
route.put("/:id", protect, putExperience);

module.exports = route;
