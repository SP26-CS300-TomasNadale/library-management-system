const express = require("express");
const router = express.Router();

const Author = require("../models/author");
const Book = require("../models/book");

router.get("/", async (req, res) => {
  try {
    const { sortBy } = req.query;

    let order = [];

    if (sortBy === "name") {
      order.push(["name", "ASC"]);
    }

    const authors = await Author.findAll({
      order
    });

    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id, {
      include: Book
    });

    if (!author) {
      return res.status(404).json({
        message: "Author not found"
      });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);

    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found"
      });
    }

    await author.update(req.body);

    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);

    if (!author) {
      return res.status(404).json({
        message: "Author not found"
      });
    }

    await author.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:authorId/books", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.authorId);

    if (!author) {
      return res.status(404).json({
        message: "Author not found"
      });
    }

    const books = await Book.findAll({
      where: {
        authorId: req.params.authorId
      }
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/:authorId/books", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.authorId);

    if (!author) {
      return res.status(404).json({
        message: "Author not found"
      });
    }

    const newBook = await Book.create({
      ...req.body,
      authorId: req.params.authorId
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

module.exports = router;