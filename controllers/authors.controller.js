const { authors } = require("../models/index");

async function getAllAuthors(req, res, next) {
  try {
    const _authors = await authors.findAll({});
    console.log(_authors);
    res.json(_authors);
  } catch (error) {
    return next(error);
  }
}

async function getAuthor(req, res, next) {
  const authorId = req.params.id;
  try {
    const _author = await authors.findOne({ where: { id: authorId } });
    res.json(_author);
  } catch (error) {
    return next(error);
  }
}

async function addNewAuthor(req, res, next) {
  try {
    await authors.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.json({ message: "추가완료" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllAuthors: getAllAuthors,
  addNewAuthor: addNewAuthor,
  getAuthor: getAuthor,
};
