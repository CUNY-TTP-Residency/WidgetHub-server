const Sequelize = require('sequelize');
const { name } = require('../package.json');
require('dotenv').config()

// Initialize database with Sequelize
const db = new Sequelize(
  //fill in username and password with your psql username and password
  process.env.DATABASE_URL || `postgres://${process.env.DB_HOST}:${process.env.DB_PW}@localhost:5432/${name}`,
  {
    logging: false,
    dialectOptions: {
      ssl: {
          sslmode: 'require',
          rejectUnauthorized: false
      }
    }
  }
);

module.exports = db;
