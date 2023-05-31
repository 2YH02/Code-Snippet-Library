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

// Get snippets by author_id
exports.getSnippetsByAuthorId = async (req, res) => {
  try {
    const snippets = await Snippet.findAll({
      where: { author_id: req.params.id },
    });

    res.json({ body: snippets });
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get snippets by id
exports.getSnippetsById = async (req, res) => {
  try {
    const snippets = await Snippet.findOne({
      where: { id: req.params.id },
    });

    res.json({ body: snippets });
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get snippets by 6
exports.getSnippetsBySix = async (req, res) => {
  const page = req.query.page || 1; // 페이지 번호, 기본값은 1
  const itemsPerPage = 6; // 한 페이지당 보여줄 상품 수

  try {
    // 상품 데이터 조회
    const snippets = await Snippet.findAll({
      order: [["id", "DESC"]],
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      // include: [
      //   {
      //     model: Author,
      //     attributes: ["name"],
      //   },
      // ],
    });

    res.json(snippets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create snippet
exports.createSnippet = async (req, res) => {
  try {
    let {
      title,
      description,
      code,
      language,
      tags,
      author_id,
      author_name,
      rating,
    } = req.body;

    // If language is none, guess the lang in a simple way.
    if (!language) {
      language = detectLang(code);
    }

    const author = await Author.findByPk(author_id);
    const snippet = await Snippet.create({
      title,
      description,
      code,
      language,
      tags,
      author_id,
      author_name,
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
