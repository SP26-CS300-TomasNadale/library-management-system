const express = require("express");
const router = express.Router();
const Author = require("../models/author");

router.get("/", async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
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

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);

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


module.exports = router;