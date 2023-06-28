// config.js
require("dotenv").config(); // loads environment variables from a .env file into process.env

module.exports = {
  port: process.env.PORT || 8123,
  db: {
    database: process.env.DB_DATABASE || "snippet_library",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    options: {
      dialect: process.env.DIALECT || "mysql",
      host: process.env.DB_HOST || "localhost",
      logging: false,
    },
  },
};
