const { Users } = require("../../config/sequelize_database");
const globalServices = require("../../services/globalServices");

const services = {

  getUserData: globalServices.getUserData,

  updateUserInfo: (id, info) => Users.update({ profile_info: info }, { where: { id } })
  
}


module.exports = services;