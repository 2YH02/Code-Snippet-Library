const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("hello world");
});

app.listen(8089, () => {
  console.log("listening on 8089");
});
