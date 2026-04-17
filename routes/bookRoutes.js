const express = require("express");
const router = express.Router();
const { Book, Author } = require("../models");
//
// GET all books (with author)
//
router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll({ include: Author });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//
// GET single book
//
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: Author
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//
// POST create book (check author exists)
//
router.post("/", async (req, res) => {
  try {
    const { authorId } = req.body;
    const author = await Author.findByPk(authorId);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//
// GET books by author (nested)
//
router.get("/author/:authorId", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.authorId);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    const books = await Book.findAll({
      where: { authorId: req.params.authorId }
    });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//
// POST book under author (nested)
//
router.post("/author/:authorId", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.authorId);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }
    const book = await Book.create({
      ...req.body,
      authorId: req.params.authorId
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;