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
router.get("/get-file/:fileId", authMiddleware, fileController.getFile);
router.get("/get-files", authMiddleware, fileController.getFiles);
router.get("/download/:fileId", authMiddleware, fileController.downloadFile);
router.delete("/remove-file/:fileId", authMiddleware, fileController.removeFile);

module.exports = router;
