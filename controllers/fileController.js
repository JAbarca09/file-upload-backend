const multer = require("multer");
const File = require("../models/file");

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files as Buffer
exports.upload = multer({ storage });

exports.uploadFile = async (req, res) => {
  try {
    const { filename } = req.body;
    const file = req.file.buffer; // The uploaded file's buffer
    const size = req.file.size / 1048576; // file size in MB
    const user = req.user;
    const newFile = new File({
      filename,
      file,
      size,
      user: user.userId,
    });

    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error uploading file" });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const user = req.user;

    const files = await File.find({ user: user.userId });
    res.status(200).json(files);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving files" });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const user = req.user.userId;

    const file = await File.findOne({ _id: fileId, user: user });

    if (!file) {
      return res
        .status(404)
        .json({ message: "File not found or unauthorized" });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    // Send the file as a download
    res.send(file.file);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error downloading file" });
  }
};

exports.removeFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const user = req.user;

    const file = await File.findOne({ _id: fileId, user: user.userId });

    if (!file) {
      return res
        .status(404)
        .json({ message: "File not found or unauthorized" });
    }

    await File.deleteOne({ _id: fileId });
    res.status(204).json({ message: "File deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving files" });
  }
};
