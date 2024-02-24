const express = require("express");
const router = express.Router();
const Wall = require("../../models/Wall");

router.get("/walls", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const walls = await Wall.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Wall.countDocuments();
    if (walls) {
      res.status(200).json({
        currentPage: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / limit),
        walls,
      });
    } else {
      res.status(400).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/walls/:id", async (req, res) => {
  try {
    if (req.params.id == "keyword") {
      res.redirect("/walls/keyword/all");
      return;
    }
    const wall = await Wall.findById(req.params.id);
    if (wall) {
      res.status(200).json(wall);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/walls/keyword/:keyword", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let walls;
    let count;
    if (req.params.keyword == "all") {
      walls = await Wall.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      count = await Wall.countDocuments();
    } else {
      walls = await Wall.find({
        tags: { $in: req.params.keyword },
      })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      count = await Wall.countDocuments({
        tags: { $in: req.params.keyword },
      });
    }
    if (walls) {
      res.status(200).json({
        currentPage: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / limit),
        walls,
      });
    } else {
      res.status(404).send("Resource not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
