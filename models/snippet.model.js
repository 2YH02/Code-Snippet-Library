const db = require("../data/database");

class Snippet {
  constructor(title, body, author_id, created_at, updated_at, rating) {
    this.title = title;
    this.body = body;
    this.author_id = author_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.rating = rating;
  }

  static async getAllSnippets() {
    return db.query("SELECT * FROM snippets");
  }

  save() {
    let data = [
      this.title,
      this.body,
      this.author_id,
      this.created_at,
      this.updated_at,
      this.rating,
    ];
    return db.query(
      "INSERT INTO snippets (title, body, author_id, created_at, updated_at, rating) VALUES (?)",
      [data]
    );
  }
}

module.exports = Snippet;
