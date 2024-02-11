const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const Wall = require("../../models/Wall");

const uploadsFolder = `${path.join(__dirname, "..", "..")}/public/uploads`;

router.get("/walls", async (req, res) => {
  const walls = await Wall.find();
  if (walls) {
    res.status(200).send(walls);
  } else {
    res.status(400).send();
  }
});

router.get("/walls/:id", async (req, res) => {
  const wall = await Wall.findById(req.params.id);
  if (wall) {
    res.status(200).send(wall);
  } else {
    res.status(404).send();
  }
});

module.exports = router;
