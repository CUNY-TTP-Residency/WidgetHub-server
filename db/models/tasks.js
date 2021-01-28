const Sequelize = require('sequelize')
const db = require('../db')

const Tasks = db.define('task', {
    task: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Tasks;