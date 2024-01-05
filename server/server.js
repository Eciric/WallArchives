const express = require("express");
const router = require("../server/routers/wall-router");
const cors = require("cors");
require("dotenv").config();

let corsOrigin = {
  origin: process.env.FRONTEND_URL,
};

const app = express();

app.use(cors(corsOrigin));

app.use(router);

app.get("/", (req, res) => {
  res.json({ msg: "This is CORS-enabled for a Single Route" });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
