const Player = require('./player');
const User = require('./user')
const Preferences = require('./userPreferences')

//ASSOICATIONS GO HERE -- Read more at https://sequelize.org/master/manual/assocs.html
User.hasOne(Preferences)

module.exports = {
  Player,
  User,
  Preferences
};
