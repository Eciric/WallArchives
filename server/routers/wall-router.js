const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const uploadsFolder = `${path.join(__dirname, "..", "..")}/public/uploads`;

router.get("/walls", (req, res) => {
  const fileNames = fs.readdirSync(uploadsFolder);
  res.status(200).send(fileNames);
});

router.get("/walls/:id", (req, res) => {
  res.status(200).send("test" + id + ".png");
});

module.exports = router;
