const express = require("express");
const router = express.Router();

router.get("/wall/:id", (req, res) => {
  res.status(200).send(JSON.stringify(req.params));
});

module.exports = router;
