const db = require("../data/database");

const Snippet = require("../models/snippet.model");

async function getData(req, res, next) {
  try {
    snippets = await Snippet.getAllSnippets();
  } catch (error) {
    return next(error);
  }

  res.json(snippets[0]);
}

async function storeData(req, res, next) {
  const data = [
    req.body.title,
    req.body.body,
    req.body.author_id,
    req.body.created_at,
  ];

  const snippet = new Snippet(...data);

  try {
    await snippet.save();
  } catch (error) {
    return next(error);
  }

  res.json({ message: "추가완료", createdSnippet: snippet });
}

module.exports = {
  storeData: storeData,
  getData: getData,
};
