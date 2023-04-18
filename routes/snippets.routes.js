const express = require("express");

const snippetsController = require("../controllers/snippets.controller");

const router = express.Router();

router.get("/posts", snippetsController.getData);

router.post("/posts", snippetsController.storeData);

module.exports = router;
