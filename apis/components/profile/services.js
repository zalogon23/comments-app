const { Users } = require("../../config/sequelize_database");
const globalServices = require("../../services/globalServices");

const services = {
  getUserData: globalServices.getUserData,
  updateUserInfo: function (id, info) {
    info = info.split("\`").join("").split("\"").join("").split("\'").join("");
    return Users.update({ profile_info: info }, { where: { id } })
  }
}


module.exports = services;