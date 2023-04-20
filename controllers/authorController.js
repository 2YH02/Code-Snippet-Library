const { Snippet } = require("../models/snippetModel");
const { Author } = require("../models/authorModel");

// Get authors
exports.getAuthors = async (_req, res) => {
  try {
    const authors = await Author.findAll({});

    res.json({ body: authors });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Create author
exports.createAuthor = async (req, res) => {
  try {
    await Author.create({
      name: req.body.name,
      email: req.body.email,
    });

    res.json({ message: "Author 생성 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Update author
exports.updateAuthor = async (req, res) => {
  try {
    const { name, mail, author_id } = req.body;
    const author = await Author.findByPk(author_id);
    author.name = name;
    author.mail = mail;
    await author.save();

    res.json({ message: "Author 업데이트 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Delete snippet
exports.deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByPk(req.params.id);
    await snippet.destroy();

    res.json({ message: "삭제 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
