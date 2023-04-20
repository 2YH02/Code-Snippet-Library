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

async function getData(req, res, next) {
  let snippetId = req.params.id;

  try {
    let _snippet = await snippets.findOne({ where: { id: snippetId } });
    res.json(_snippet);
  } catch (error) {
    return next(error);
  }
}

async function addNewData(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is missing or empty" });
  }
  try {
    await snippets.create({
      title: req.body.title,
      body: req.body.body,
      author_id: req.body.author_id,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at,
      rating: req.body.rating,
    });

    res.json({ message: "추가완료" });
  } catch (error) {
    return next(error);
  }
}

async function updateData(req, res, next) {
  const snippetId = req.params.id;
  try {
    await snippets.update(
      {
        title: req.body.updatedTitle,
        body: req.body.updatedBody,
      },
      { where: { id: snippetId } }
    );
    res.json({ message: "업데이트 완료" });
  } catch (error) {
    return next(error);
  }
}

async function deleteData(req, res, next) {
  const snippetId = req.params.id;
  try {
    await snippets.destroy({
      where: { id: snippetId },
    });
    res.json({ message: "삭제 완료" });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllData: getAllData,
  getData: getData,
  addNewData: addNewData,
  updateData: updateData,
  deleteData: deleteData,
};
