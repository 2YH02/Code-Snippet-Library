// routes/snippetRoutes.js

const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

router.get("/", authorController.getAuthors);
router.get("/:id", authorController.getAuthorById)
router.post("/new", authorController.createAuthor);
router.put("/update", authorController.updateAuthor);
router.post("/delete", authorController.deleteAuthor);

module.exports = router;
