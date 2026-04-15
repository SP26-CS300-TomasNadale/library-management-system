const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  bio: {
    type: DataTypes.TEXT
  },
  birthYear: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1900,
      max: 2024
    }
  }
});

module.exports = Author;