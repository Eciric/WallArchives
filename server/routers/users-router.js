const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;
const { ensureAuthenticated } = require("../config/auth");

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
      .then(() => {
        res.set("session", session_id);
        res.set("Access-Control-Expose-Headers", "session");
        res.status(200).send();
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
          res.set("session", session_id);
          res.set("Access-Control-Expose-Headers", "session");
          res.status(200).send();
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

router.get("/sign-out", ensureAuthenticated, (req, res) => {
  const session = req.get("session").replace(`"`, "").replace(`"`, "");
  console.log(session);
  User.findOne({ session }).then((user) => {
    user.session = "";
    user
      .save()
      .then(res.status(200).send())
      .catch((err) => res.status(500).send(err));
  });
});

module.exports = router;
