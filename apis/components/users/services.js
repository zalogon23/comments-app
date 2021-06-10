const { Users } = require("../../config/sequelize_database");

const services = {

  getUserFromDB: id => Users.findOne({ attributes: { exclude: ["password"] }, where: { id }, raw: true })
  
}


module.exports = services;