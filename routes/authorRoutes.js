// routes/snippetRoutes.js

const express = require("express");
const authorController = require("../controllers/authorController");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post("/profile", upload.single("image"), (req, res) => {
  // console.log(req.file);
  res.json(req.file);
});

router.put("/profile", authorController.updateProfile);

router.get("/profile/:file", (req, res) => {
  res.sendFile(`images/${req.params.file}`, { root: "." });
});

router.get("/", authorController.getAuthors);
router.get("/:id", authorController.getAuthorById);
router.get("/likes/:id", authorController.getAuthorLikes);
router.post("/new", authorController.createAuthor);
router.post("/delete", authorController.deleteAuthor);
router.put("/update", authorController.updateAuthor);
router.put("/likes", authorController.updateLikes);

module.exports = router;
