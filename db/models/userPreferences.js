const Sequelize = require('sequelize');
const db = require('../db');

const Preferences = db.define('preference', {
    clock: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    toDoList: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    // weather: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: false
    // },
    // news: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: false
    // }
})

module.exports = Preferences;