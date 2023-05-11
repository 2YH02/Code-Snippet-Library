// routes/snippetRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/auth/google", authController.resToken);

router.post("/auth/google/refresh-token", authController.resCredential);

module.exports = router;
