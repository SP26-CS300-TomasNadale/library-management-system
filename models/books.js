const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 200]
    }
  },
  isbn: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true,
    validate: {
      len: [13, 13]
    }
  },
  publishedYear: {
    type: DataTypes.INTEGER
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Authors", // table name
      key: "id"
    },
    onDelete: "CASCADE"
  }
});
module.exports = Book;