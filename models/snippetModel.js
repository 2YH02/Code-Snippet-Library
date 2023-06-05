const { Sequelize, DataTypes } = require("sequelize");
const { Author } = require("./authorModel");
const config = require("../config.js");
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

const Snippet = sequelize.define(
  "snippets",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "authors",
        key: "id",
      },
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 1.0,
    },
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Snippet.belongsTo(Author, { foreignKey: "author_id" });
module.exports = { Snippet };
