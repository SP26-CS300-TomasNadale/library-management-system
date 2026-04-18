const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Author = require("../models/author");

router.get("/", async (req, res) => {
  try {
    const { year, author } = req.query;

    let where = {};
    let include = {
      model: Author
    };

    if (year) {
      where.publishedYear = year;
    }

    if (author) {
      include.where = {
        name: author
      };
    }

    const books = await Book.findAll({
      where,
      include
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: Author
    });

    if (!book) {
      return res.status(404).json({
        error: "Book not found"
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const author = await Author.findByPk(req.body.authorId);

    if (!author) {
      return res.status(404).json({
        error: "Author not found"
      });
    }

    const book = await Book.create(req.body);

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;