const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  role: {
    type: String,
    default: "client"
  }
});

module.exports = mongoose.model("User", userSchema);
