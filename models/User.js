const mongoose = require("mongoose");

//User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, trim: true, required: true },
  username: { type: String, unique: true, trim: true, required: true },
  password: { type: String, trim: true },
  date: { type: Date, default: Date.now },
  session: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);
