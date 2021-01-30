const Sequelize = require('sequelize');
const db = require('../db');

const Preferences = db.define('preference', {
    clock: {
        type: Sequelize.BOOLEAN,
    },
    toDoList: {
        type: Sequelize.BOOLEAN,
    },
    weather: {
        type: Sequelize.BOOLEAN,
    },
    news: {
        type: Sequelize.BOOLEAN,
    },
    covid: {
        type: Sequelize.BOOLEAN,
    },
})

module.exports = Preferences;