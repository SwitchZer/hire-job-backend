const express = require("express");
const {
  postRecruiters,
  putRecruiters,
  profileRecruiters,
  updateProfileRecruiter,
} = require("../controller/recruiters");
const { protect } = require("../middlewares/auth");
const route = express.Router();
const upload = require("../middlewares/upload");

route
  .post("/register", postRecruiters)
  .put("/profile", protect, putRecruiters)
  .get("/profile", protect, profileRecruiters)
  .put(
    "/profile/photo",
    protect,
    upload.single("photo"),
    updateProfileRecruiter
  );

module.exports = route;
