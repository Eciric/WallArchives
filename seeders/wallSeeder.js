require("dotenv").config();
const mongoose = require("mongoose");
const Wall = require("../models/Wall");

const walls = [
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "A test wallpaper",
    path: "/test.png",
    tags: "sky, tree, forest, urban, colorful",
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "A test wallpaper 1",
    path: "/test1.png",
    tags: "sky, tree, forest, urban, colorful",
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "A test wallpaper 2",
    path: "/test2.png",
    tags: "sky, tree, forest, urban, colorful",
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "A test wallpaper 3",
    path: "/test3.png",
    tags: "sky, tree, forest, urban, colorful",
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "A test wallpaper 4",
    path: "/test4.png",
    tags: "sky, tree, forest, urban, colorful",
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "A test wallpaper 5",
    path: "/test5.png",
    tags: "sky, tree, forest, urban, colorful",
    date: Date.now(),
  }),
];

mongoose
  .connect(process.env.ATLAS_URI)
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(() => {
    console.log("Wall seeder connected to db");
    walls.map(async (wall, index) => {
      await wall.save();
      if (index == walls.length - 1) {
        console.log("Finished seeding walls");
        process.exit();
      }
    });
  });
