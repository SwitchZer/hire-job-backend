const express = require("express");
const {
  postRecruiters,
  putRecruiters,
  profileRecruiters,
} = require("../controller/recruiters");
const { protect, checkRole } = require("../middlewares/auth");
const route = express.Router();

route
  .post("/register", postRecruiters)
  .put("/profile", checkRole("recruiter"), protect, putRecruiters)
  .get("/profile", checkRole("recruiter"), protect, profileRecruiters);

module.exports = route;
