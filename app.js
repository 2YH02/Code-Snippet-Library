const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const snippetsRoutes = require("./routes/snippets.routes");
const authorsRoutes = require("./routes/authors.routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8089;

app.get("/hello", (req, res) => {
  res.send("hey world");
});

app.use(snippetsRoutes);
app.use(authorsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
