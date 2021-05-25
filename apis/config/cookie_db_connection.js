const mysqlPromise = require("mysql2/promise");
const promiseAdapter = require("express-mysql2-session-promise-adapter");
const options = require("./database_options");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const connection = mysqlPromise.createConnection(options);
const sessionStore = new MySQLStore({}, promiseAdapter.default(connection));

module.exports = sessionStore;