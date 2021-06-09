const session = require("express-session");
const { sequelize } = require("./sequelize_database");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sessionStore = new SequelizeStore({ db: sequelize });

module.exports = sessionStore;