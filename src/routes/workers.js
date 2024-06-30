const express = require("express");
const {
  getWorkers,
  postWorkers,
  // putWorkers,
  deleteWorkers,
  getidWorkers,
  profileWorkers,
  updateProfileWorker,
  putWorkers,
} = require("../controller/workers");
const { protect } = require("../middlewares/auth");
const route = express.Router();
const upload = require("../middlewares/upload");

route
  .post("/register", postWorkers)
  .get("/", protect, getWorkers)
  .delete("/:id", protect, deleteWorkers)
  .get("/:id", getidWorkers)
  .put("/profile", protect, putWorkers)
  .get("/profile", protect, profileWorkers)
  .put("/profile/photo", protect, upload.single("photo"), updateProfileWorker);

module.exports = route;
