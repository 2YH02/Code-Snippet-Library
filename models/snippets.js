let _sequelize = require("sequelize");
const { Model, Sequelize } = _sequelize;

class snippets extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        body: {
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
        rating: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "snippets",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "fk_snippets_author_id_idx",
            using: "BTREE",
            fields: [{ name: "author_id" }],
          },
        ],
      }
    );
  }
}

module.exports = snippets;
