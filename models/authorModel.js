const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config.js");
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

const Author = sequelize.define(
  "authors",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    follow: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    likes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
  }
);

module.exports = { Author };
