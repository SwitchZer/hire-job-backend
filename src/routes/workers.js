const express = require("express");
const {
  getWorkers,
  postWorkers,
  // putWorkers,
  deleteWorkers,
  getidWorkers,
  profileWorkers,
} = require("../controller/workers");
const { protect, checkRole } = require("../middlewares/auth");
// const {
//   hitCacheProfileId,
//   clearCacheProfileId,
// } = require("../middlewares/redis");
const route = express.Router();

// route
//   .get("/", protect, getWorkers)
//   .post("/register", clearCacheProfileId, postWorkers)
//   // .put("/users/:id", checkRole("worker"), protect, putWorkers)
//   .delete("/:id", protect, deleteWorkers, clearCacheProfileId)
//   .get("/:id", protect, getidWorkers, hitCacheProfileId)
//   .get(
//     "/profile",
//     protect,
//     checkRole("worker"),
//     hitCacheProfileId,
//     profileWorkers
//   );

route
  .get("/", protect, getWorkers)
  .post("/register", postWorkers)
  // .put("/users/:id", checkRole("worker"), protect, putWorkers)
  .delete("/:id", protect, deleteWorkers)
  .get("/:id", protect, getidWorkers)
  .get("/profile", protect, checkRole("worker"), profileWorkers);

module.exports = route;
