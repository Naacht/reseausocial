const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../helpers/connectionDB');
const { Session } = require('../models/sessionModel');

const sessionStore = new SequelizeStore({
  db: sequelize,
  table: 'Session',
  extendDefaultFields: (defaults, session) => ({
    user_id: session.user_id,
  }),
});

module.exports = session({
  secret: 'secret',
  cookie: { maxAge: 600000 },
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
});
