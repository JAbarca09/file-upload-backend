const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // Reference to the User model if you have one
  //   required: true,
  // },
  // file: {
  //   type: Buffer,
  //   required: true,
  // },
//   description: {
//     type: String,
//   },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
