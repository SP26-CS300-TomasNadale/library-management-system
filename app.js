const express = require("express");
const sequelize = require("./config/database");
const authorRoutes = require("./routes/authorRoutes");

const app = express();

app.use(express.json());

app.use("/api/authors", authorRoutes);

sequelize.sync().then(() => {
  console.log("Database connected");
});

module.exports = app;