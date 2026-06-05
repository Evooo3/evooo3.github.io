var express = require("express");
var router = express.Router();
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");
const dbPath = path.resolve(__dirname, "../data.db");
const db = new DatabaseSync(dbPath);

router.get("/", (req, res, next) => {
  try {
    const books = db.prepare("SELECT * FROM book").all();

    res.render("books/index", { books: books, title: "Books" });
  } catch (err) {
    next(err);
  }
});

router.get("/create", (req, res) => {
  res.render("books/create", { title: "Book Create" });
});

router.post("/create", (req, res, next) => {
  try {
    const { title, author } = req.body;

    const result = db
      .prepare("INSERT INTO book (title, author) VALUES (?, ?)")
      .run(title, author);
    res.redirect("/books/" + result.lastInsertRowid);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const book = db
      .prepare("SELECT * FROM book WHERE id = ?")
      .get(req.params.id);

    res.render("books/show", { book: book, title: book.title });
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", (req, res, next) => {
  try {
    const book = db
      .prepare("SELECT * FROM book WHERE id = ?")
      .get(req.params.id);

    res.render("books/edit", { book: book, title: "Edit " + book.title });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/edit", (req, res, next) => {
  try {
    const { title, author } = req.body;
    const id = req.params.id;
    db.prepare("UPDATE book SET title = ?, author = ? WHERE id = ?")
      .run(title, author, id);
    res.redirect("/books/" + id);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/delete", (req, res, next) => {
  try {
    const id = req.params.id;
    db.prepare("DELETE FROM book WHERE id = ?").run(id);
    res.redirect("/books/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
