let _sequelize = require("sequelize");
const DataTypes = _sequelize.DataTypes;
let _authors = require("./authors.js");
let _snippets = require("./snippets.js");

function initModels(sequelize) {
  const authors = _authors.init(sequelize, DataTypes);
  const snippets = _snippets.init(sequelize, DataTypes);

  snippets.belongsTo(authors, { as: "author", foreignKey: "author_id" });
  authors.hasMany(snippets, { as: "snippets", foreignKey: "author_id" });

  return {
    authors,
    snippets,
  };
}

module.exports = initModels;
