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
  },
  {
    timestamps: false,
    underscored: true,
  }
);

module.exports = { Author };
