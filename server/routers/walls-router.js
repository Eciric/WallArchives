const express = require("express");
const router = express.Router();
const Wall = require("../../models/Wall");

router.get("/walls", async (req, res) => {
  const walls = await Wall.find();
  if (walls) {
    res.status(200).send(JSON.stringify(walls));
  } else {
    res.status(400).send();
  }
});

router.get("/walls/:id", async (req, res) => {
  const wall = await Wall.findById(req.params.id);
  if (wall) {
    res.status(200).send(JSON.stringify(wall));
  } else {
    res.status(404).send();
  }
});

router.get("/walls/:wallKeyword", async (req, res) => {
  console.log("getting", req.params.wallKeyword);
  let filter = { tags: [`${req.params.wallKeyword}`] };
  filter.tags = { $in: filter.tags.map((t) => new RegExp(t)) };
  const walls = await Wall.find(filter);
  if (walls) {
    res.status(200).send(JSON.stringify(walls));
  } else {
    res.status(404).send();
  }
});

module.exports = router;
