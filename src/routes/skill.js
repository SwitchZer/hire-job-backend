const express = require("express");
const {
  getProfileSkills,
  addSkills,
  deleteSkills,
  getSkillIdWorkers,
} = require("../controller/skill");
const { protect, checkRole } = require("../middlewares/auth");

const route = express.Router();

route.post("/", protect, checkRole("worker"), addSkills);
route.get("/", protect, checkRole("worker"), getProfileSkills);
route.delete("/:id", protect, checkRole("worker"), deleteSkills);
route.get("/:id", protect, getSkillIdWorkers);

module.exports = route;
