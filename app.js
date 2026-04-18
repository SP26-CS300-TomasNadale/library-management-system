const express = require("express");
const sequelize = require("./config/database");

const Author = require("./models/author");
const Book = require("./models/book");

const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(express.json());

app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);

Author.hasMany(Book, {
  foreignKey: "authorId",
  onDelete: "CASCADE"
});

Book.belongsTo(Author, {
  foreignKey: "authorId"
});

sequelize.sync().then(() => {
  console.log("Database connected");
});

module.exports = app;