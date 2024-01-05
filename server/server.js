const express = require("express");
const router = require("../server/routers/wall-router");
const app = express();
const port = 3002;

app.use(router);

app.get("/", (req, res) => {
  res.send({
    a: "hello",
    b: "world",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
