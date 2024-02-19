require("dotenv").config();
const mongoose = require("mongoose");
const Wall = require("../models/Wall");

const walls = [
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Japanese vista through a torii",
    path: "/test.png",
    tags: [
      "mountain",
      "fuji",
      "colorful",
      "blossoms",
      "cherry",
      "trees",
      "tree",
      "samurai",
      "gate",
      "torii",
      "sky",
      "clouds",
    ],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Beautiful Aurora",
    path: "/test1.png",
    tags: [
      "aurora",
      "green",
      "bridge",
      "horizon",
      "skyline",
      "river",
      "water",
      "sky",
      "stars",
    ],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Relaxing grass hills",
    path: "/test2.png",
    tags: [
      "sky",
      "clouds",
      "cloud",
      "grass",
      "hills",
      "rock",
      "rocks",
      "bushes",
      "green",
      "greenery",
    ],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Sun setting over a city",
    path: "/test3.png",
    tags: [
      "sky",
      "clouds",
      "stars",
      "skyline",
      "city",
      "buildings",
      "skyscrapers",
      "girl",
    ],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Relaxing night view of the mountains",
    path: "/test4.png",
    tags: ["sky, clouds", "mountains", "blue", "moon", "stars"],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "From a top a mountain",
    path: "/test5.png",
    tags: [
      "mountain",
      "mountains",
      "rock",
      "rocks",
      "rocky",
      "hill",
      "hills",
      "hilly",
      "grass",
      "grassy",
      "clouds",
      "sky",
    ],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Enchanting forest",
    path: "/test6.png",
    tags: ["moon", "forest", "river", "mountains", "tree", "trees"],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Haku from Spirited Away",
    path: "/test7.png",
    tags: [
      "japanese",
      "person",
      "weapons",
      "katana",
      "sword",
      "anime",
      "kanji",
    ],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Starry view of mountains stretching over a horizon",
    path: "/test8.png",
    tags: ["mountains", "night", "horizon", "sky", "stars", "fog"],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Upside down view of the city",
    path: "/test9.png",
    tags: ["sky", "clouds", "buildings", "airplane", "plane"],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Relaxing coastal village on a cliff",
    path: "/test10.png",
    tags: [
      "coast",
      "seaside",
      "village",
      "tropical",
      "sky",
      "sea",
      "cliff",
      "cliffs",
    ],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Japanese inspired wilderness",
    path: "/test11.png",
    tags: [
      "trees",
      "tree",
      "plants",
      "river",
      "japanese",
      "mountains",
      "sky",
      "sun",
      "clouds",
    ],
    date: Date.now(),
  }),
  new Wall({
    _uid: "65c3f07e1b69e02d19a415fb",
    title: "Warm city skyline by a river",
    path: "/test12.png",
    tags: [
      "skyline",
      "city",
      "buildings",
      "skyscrapers",
      "river",
      "sky",
      "clouds",
    ],
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
