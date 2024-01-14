const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const passport = require("passport");

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

router.post("/users", async (req, res) => {
  try {
    const registerUser = await User.register(
      {
        email: req.body.email,
        username: req.body.username,
        dateCreated: Date.now(),
      },
      req.body.password
    );
    if (registerUser) {
      passport.authenticate("local")(req, res, () => {
        res.status(200).send(req.body);
      });
    } else {
      res.status(500).send(req.body);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/login", (req, res) => {
  const user = new User({
    email: req.body.email,
    passwowrd: req.body.email,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      passport.authenticate("local")(req, res, () => {
        res.status(200).send();
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) res.status(500).send(err);
    else res.status(200).send();
  });
});

module.exports = router;
