const express = require("express");
const fileController = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/upload-file", authMiddleware, fileController.uploadFile);
router.get("/get-file", fileController.getFile);

module.exports = router;