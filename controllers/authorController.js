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

// Get author by id
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { id: req.params.id },
    });

    res.json({ body: author });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get author likes
exports.getAuthorLikes = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { id: req.params.id },
    });

    res.json({ body: author.likes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Create author
exports.createAuthor = async (req, res) => {
  const author = await Author.findOne({
    where: { email: req.body.email },
  });
  if (!author) {
    try {
      const createdAuthor = await Author.create({
        name: req.body.name,
        email: req.body.email,
        img: null,
        follow: 0,
        access_token: req.body.access_token,
      });
      res.json(createdAuthor);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  } else {
    res.json(author);
  }
};

// Update author
exports.updateAuthor = async (req, res) => {
  try {
    const { name, mail, img, follow, author_id } = req.body;
    const author = await Author.findByPk(author_id);
    if (author.name !== name) {
      author.name = name;
      await author.save();
    }

    res.json({ message: "Author 업데이트 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Upload image file
exports.updateProfile = async (req, res) => {
  try {
    const { name, mail, img, follow, author_id } = req.body;
    const author = await Author.findByPk(author_id);
    if (author.img !== img) {
      author.img = img;
      await author.save();
    }

    res.json({ message: "Author 업데이트 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Upload likes
exports.updateLikes = async (req, res) => {
  try {
    const { snippet_id, author_id } = req.body;
    const author = await Author.findByPk(author_id);
    if (author.likes === null) {
      author.likes = [snippet_id];

      console.log(author.likes, 1);
      await author.save();
    } else if (author.likes.includes(snippet_id)) {
      author.likes = author.likes.filter((v, i) => {
        return v !== snippet_id;
      });

      console.log(author.likes, 2);

      await author.save();
    } else {
      author.likes = [...author.likes, snippet_id];
      console.log(author.likes, 3);
      await author.save();
    }
    res.json({ message: "Author 업데이트 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Delete snippet
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { email: req.body.email },
    });
    await author.destroy();

    res.json({ message: "삭제 완료" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
