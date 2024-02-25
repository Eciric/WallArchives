const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;
const { ensureAuthenticated } = require("../config/auth");

router.get("/users/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await User.findOne({ _id: uid });
    if (user) {
      res.status(200).send({
        uid: user._id,
        email: user.email,
        username: user.username,
        date: user.date,
        session: user.session,
      });
    } else {
      res.status(400).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/users", async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    res.status(500).send({ error: "All fields are required!" });
    return;
  }

  if (password.length < 8) {
    res
      .status(500)
      .send({ error: "Password needs to be at least 8 characters" });
    return;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(500).send({ error: "Email already exists" });
    return;
  }

  const newUser = new User({
    username,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) {
      res.status(500).send({ msg: "Failed to hash password" });
      return;
    }
    const session_id = uuid();
    newUser.session = session_id;
    newUser.password = hash;
    newUser
      .save()
      .then((user) => {
        res.status(200).send({
          uid: user._id,
          email: user.email,
          username: user.username,
          date: user.date,
          session: session_id,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ msg: "Failed to create user" });
      });
  });
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const correctPwd = bcrypt.compareSync(password, user.password);
    if (correctPwd) {
      const session_id = uuid();
      user.session = session_id;
      user
        .save()
        .then(() => {
          res.status(200).send({
            uid: user._id,
            email: user.email,
            username: user.username,
            date: user.date,
            session: session_id,
          });
        })
        .catch(() => {
          res.status(500).send({ error: "Failed to authenticate" });
        });
    } else {
      res.status(401).send({ error: "Incorrect credentials" });
    }
  } else {
    res.status(401).send({ error: "Incorrect credentials" });
  }
});

router.get("/sign-out", ensureAuthenticated, async (req, res) => {
  let session = req.get("session");
  let user = await User.findOne({ session }).exec();
  if (user) {
    user.session = "";
    user
      .save()
      .then(res.status(200).send())
      .catch((err) => res.status(500).send(err));
  } else {
    res.status(400).send();
  }
});

module.exports = router;
