const express = require("express");

const snippetsController = require("../controllers/snippets.controller");

const router = express.Router();

router.get("/posts", snippetsController.getAllData);

router.post("/posts", snippetsController.addNewData);

module.exports = router;
