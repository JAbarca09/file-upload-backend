const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
});

// Add a method to set the password and generate salt and hash
userSchema.methods.setPassword = function (password) {
  // Generate a salt
  this.salt = bcrypt.genSaltSync(10);

  // Generate the hash using the password and salt
  this.hash = bcrypt.hashSync(password, this.salt);
};

// Add a method to validate the password
userSchema.methods.isValidPassword = function (password) {
  // Compare the hash of the input password with the stored hash
  return bcrypt.compareSync(password, this.hash);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
