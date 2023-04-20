const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config");
const snippetRoutes = require("./routes/snippetRoutes");
const authorRoutes = require("./routes/authorRoutes");

const checkRequestBody = (req, res, next) => {
  if (req.method === "POST") {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }
  }
  next();
};

// Set up middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(checkRequestBody); // 모든 json body 체크

// Set up routes
app.use("/snippets", snippetRoutes);
app.use("/authors", authorRoutes); // /authors/new 이런 식

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
