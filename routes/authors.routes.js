const express = require("express");

const authorsController = require("../controllers/authors.controller");

const router = express.Router();

router.get("/authors", authorsController.getAllAuthors);

router.get("/authors/:id", authorsController.getAuthor);

router.post("/authors", authorsController.addNewAuthor);

module.exports = router;
