const express = require("express");
const router = require("../server/routers/wall-router");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

let corsOrigin = {
  origin: process.env.FRONTEND_URL,
};
const PORT = process.env.PORT;
const app = express();
app.use(express.static(path.join(__dirname, "..") + "/public"));
app.use(cors(corsOrigin));

app.use(router);

app.get("/", (req, res) => {
  res.json({ msg: "This is CORS-enabled for a Single Route" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
