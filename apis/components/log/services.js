const { Op } = require("sequelize");
const { Users } = require("../../config/sequelize_database");

const services = {

  isUsernameAlreadyOnDB: username => Users.findOne( { attributes: { exclude: [ "password" ] }, where: { username } , raw: true } ),

  isUsernamePasswordMatching: ({ username, password }) => Users.findOne({ where: { [Op.and]: { username, password } } , raw: true } ),

  registerUserOnDB: ({ username, password, email, register_date }) => Users.create({ username, password, email, register_date })

}


module.exports = services;