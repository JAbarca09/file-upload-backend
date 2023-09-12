const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  file: {
    type: Buffer, 
    required: true,
  },
  size : {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
