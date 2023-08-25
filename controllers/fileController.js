const multer = require("multer");
const File = require("../models/file");

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files as Buffer
exports.upload = multer({ storage });

exports.uploadFile = async (req, res) => {
  try {
    const { filename } = req.body;
    const file = req.file.buffer; // The uploaded file's buffer
    const user = req.user;

    const newFile = new File({
      filename,
      file,
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
