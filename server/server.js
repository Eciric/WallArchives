require("dotenv").config();
const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const wallsRouter = require("../server/routers/walls-router");
const usersRouter = require("../server/routers/users-router");
const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.static(path.join(__dirname, "..") + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: false,
      maxAge: 60 * 60 * 1000,
    },
  })
);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(wallsRouter);
app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
