const Sequelize = require("sequelize");
const db = require('../db');
const crypto = require('crypto')

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        get() {
          return () => this.getDataValue("salt");
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

User.generateSalt = () => {
    return crypto.randomBytes(16).toString("based64")
}

//creating an encrypted password
User.encryptPassword = (plaintext, salt) => {
    return crypto.createHash('RSA-SHA256')
    .update(plaintext)
    .update(salt)
    .digest("hex")
}

//comparing hashed passwords to check if they match
User.prototype.correctPassword = (candidatepw) => {
    return User.encryptPassword(candidatepw, this.salt()) === this.password();
}

const setSaltandPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt();
        user.password = User.encryptPassword(user.password(), user.salt())
    }
}

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;