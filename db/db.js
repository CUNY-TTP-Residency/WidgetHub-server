const Sequelize = require('sequelize');
const { name } = require('../package.json');

// Initialize database with Sequelize
const db = new Sequelize(
  //fill in username and password with your psql username and password
  process.env.DATABASE_URL || `postgres://username:password@localhost:5432/${name}`,
  {
    logging: false,
  }
);

module.exports = db;
