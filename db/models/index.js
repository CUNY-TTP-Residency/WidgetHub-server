const Player = require('./player');
const User = require('./user')
const Tasks = require('./tasks')
const Preferences = require('./userPreferences')

//ASSOICATIONS GO HERE -- Read more at https://sequelize.org/master/manual/assocs.html
User.hasOne(Preferences)
User.hasMany(Tasks)

module.exports = {
  Player,
  User,
  Preferences,
  Tasks
};
