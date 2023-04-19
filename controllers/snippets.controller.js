const { snippets } = require("../models/index");

async function getAllData(req, res, next) {
  try {
    const _snippets = await snippets.findAll({});
    console.log(_snippets);
    res.json(_snippets);
  } catch (error) {
    return next(error);
  }
}

async function addNewData(req, res, next) {
  try {
    snippets.create({
      title: req.body.title,
      body: req.body.body,
      author_id: req.body.author_id,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      rating: req.body.rating,
    });

    res.json({ message: "추가완료"});
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllData: getAllData,
  addNewData: addNewData,
};
