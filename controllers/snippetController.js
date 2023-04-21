const { Snippet } = require("../models/snippetModel");
const { Author } = require("../models/authorModel");

// Guess the lang
const detectLang = require("../utils/detectLang");

// Get snippets
exports.getSnippets = async (_req, res) => {
  try {
    const snippets = await Snippet.findAll({});

    res.json({ body: snippets });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Create snippet
exports.createSnippet = async (req, res) => {
  try {
    let { title, code, language, tags, author_id, rating } = req.body;

    // If language is none, guess the lang in a simple way.
    if (!language) {
      language = detectLang(code);
    }

    const author = await Author.findByPk(author_id);
    const snippet = await Snippet.create({
      title,
      code,
      language,
      tags,
      author_id,
      rating,
    });

    res.json({ message: "생성 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Update snippet
exports.updateSnippet = async (req, res) => {
  try {
    const { title, code, language, tags, author_id } = req.body;
    const snippet = await Snippet.findByPk(req.params.id);
    const author = await Author.findByPk(author_id);
    snippet.title = title;
    snippet.code = code;
    snippet.language = language;
    snippet.tags = tags;
    snippet.author_id = author_id;
    await snippet.save();

    res.json({ message: "업데이트 완료" });
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
