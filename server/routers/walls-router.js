const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const Wall = require("../../models/Wall");

const uploadsFolder = `${path.join(__dirname, "..", "..")}/public/uploads`;

router.get("/walls", async (req, res) => {
  const walls = await Wall.find();
  console.log(walls);
  if (walls) {
    res.status(200).send(walls);
  } else {
    res.status(400).send();
  }
});

router.get("/walls/:id", (req, res) => {
  res.status(200).send("test" + id + ".png");
});

module.exports = router;
