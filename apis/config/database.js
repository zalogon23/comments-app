const mysql = require("mysql2");
const options = require("./database_options");

const db = mysql.createConnection(options);

module.exports = db;