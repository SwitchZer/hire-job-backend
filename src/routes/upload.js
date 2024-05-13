const express = require("express");
const router = express.Router();
const uploadControlLer = require("../controller/upload");
const upload = require("../middlewares/upload");

router.post("/", upload.single("file"), uploadControlLer.uploadSingle);

module.exports = router;
