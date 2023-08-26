const express = require("express");
const fileController = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  fileController.upload.single("file"),
  fileController.uploadFile
);
router.get("/get-files", authMiddleware, fileController.getFiles);

module.exports = router;
