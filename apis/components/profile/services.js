const { Users } = require("../../config/sequelize_database");
const globalServices = require("../../services/globalServices");

const services = {

  getUserDataDB: globalServices.getUserData,

  updateUserInfoDB: (id, info) => Users.update({ profile_info: info }, { where: { id } }),

  updateAvatarDB: (id, profile_image) => Users.update({ profile_image }, { where: { id } })
  
}


module.exports = services;