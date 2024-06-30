const express = require("express");
const {
  getProfileSkills,
  addSkills,
  deleteSkills,
  getSkillIdWorkers,
} = require("../controller/skill");
const { protect } = require("../middlewares/auth");

const route = express.Router();

route.post("/", protect, addSkills);
route.get("/", protect, getProfileSkills);
route.delete("/:id", protect, deleteSkills);
route.get("/:id", protect, getSkillIdWorkers);

module.exports = route;
