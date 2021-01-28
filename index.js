//NODE MODULES
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

//IMPORTS/VARIABLES
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const PORT = process.env.PORT || 8080;
const db = require('./db');
const sessionStore = new SequelizeStore({ db })
const models = require('./db/models')

const app = express();

//adds user.id to current session
passport.serializeUser((user, done) => done(null, user.id));
//fetches user from the session user id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id, {include: [models.Preferences, models.Tasks]});
    done(null, user);
  }
  catch (err) {
    done(err);
  }
});

//needed to read req body, otherwise req.body returns undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//CORS!
//app.use(cors({credentials: true, origin:' http://localhost:3000'}));
//allows for auth/me path to work, allows passport session to return user object
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
  preflightContinue: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
}))


//setting up passport and session
app.use(
  session({
    secret: "a super secretive secret key string to encrypt and sign the cookie",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//set routes
app.use('/api', require('./api'));
app.use('/auth', require('./auth'))

//START BACKEND SERVER FUNCTIOON
const serverRun = () => {
  const server = app.listen(PORT, () => {
    console.log(`Live on port : ${PORT}`);
  });
};
//DB Sync Function
//Optional parameters
// {force:true} - drops current tables and places new empty tables
//{alter:true} - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

const syncDb = () => db.sync({alter:true});
// Connects to //postgres://localhost:5432/dbname

//Run server and sync DB
sessionStore.sync()
syncDb();
serverRun();

module.exports = app;
