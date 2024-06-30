const express = require("express");
const authController = require("../controller/auth");
const { protect } = require("../middlewares/auth");
const route = express.Router();

route
  .post("/login", authController.login)
  .post("/refresh-token", authController.refreshToken)
  .get("/check-role", protect, authController.checkRole);

module.exports = route;
