const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config.js");
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options,
  { logging: false }
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
    code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Author",
        key: "author_id",
      },
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = { Snippet };
