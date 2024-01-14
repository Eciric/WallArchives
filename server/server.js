require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const wallsRouter = require("../server/routers/walls-router");
const usersRouter = require("../server/routers/users-router");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

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
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

app.get("/", (_, res) => {
  res.json({ msg: "Valid routes: /walls, /users" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
