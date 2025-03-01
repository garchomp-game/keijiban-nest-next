const sequelize = require('../config/database');
const Post = require('./Post');
const Comment = require('./Comment');

// Initialize DB and sync models
const initDB = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

module.exports = {
  sequelize,
  Post,
  Comment,
  initDB
};
