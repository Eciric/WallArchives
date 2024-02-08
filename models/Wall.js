const mongoose = require("mongoose");
const User = require("./User");

//Wall schema
const wallSchema = new mongoose.Schema({
  _uid: { type: mongoose.Schema.Types.ObjectId, ref: "_uid" },
  title: { type: String, trim: true, required: true },
  path: { type: String, trim: true, required: true },
  tags: { type: String, trim: true, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Wall", wallSchema);
