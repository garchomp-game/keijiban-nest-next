const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Use SQLite database with file path from .env or default
const dbPath = process.env.DB_PATH || path.join(__dirname, '..', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: console.log
});

module.exports = sequelize;
