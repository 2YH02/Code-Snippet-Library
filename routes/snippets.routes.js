const express = require("express");

const snippetsController = require("../controllers/snippets.controller");

const router = express.Router();

router.get("/posts", snippetsController.getAllData);

router.post("/posts", snippetsController.addNewData);

router.patch("/posts/:id", snippetsController.updateData);

router.delete("/posts/:id", snippetsController.deleteData);

module.exports = router;
