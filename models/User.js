const mongoose = require("mongoose");
const passportLM = require("passport-local-mongoose");

//User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

userSchema.plugin(passportLM);

module.exports = mongoose.model("User", userSchema);
