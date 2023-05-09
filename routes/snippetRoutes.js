// routes/snippetRoutes.js

const express = require("express");
const router = express.Router();
const snippetController = require("../controllers/snippetController");

router.get("/", snippetController.getSnippets);
router.get("/:id", snippetController.getSnippetsById);
router.post("/new", snippetController.createSnippet);
router.put("/update/:id", snippetController.updateSnippet);
router.delete("/delete/:id", snippetController.deleteSnippet);

module.exports = router;
