const mongoose = require("mongoose");
const passportLM = require("passport-local-mongoose");

//User schema
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  dateCreated: Date,
});

userSchema.plugin(passportLM);

module.exports = mongoose.model("User", userSchema);
