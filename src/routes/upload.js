const express = require("express");
const router = express.Router();
const { uploadSingle } = require("../controller/upload");
const upload = require("../middlewares/upload");

router.post("/", upload.single("file"), uploadSingle);

module.exports = router;
