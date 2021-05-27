const { Users } = require("../../config/sequelize_database");
const globalServices = require("../../services/globalServices");

const services = {
  getUserData: globalServices.getUserData,
  updateUserInfo: function (id, info) {
    info = info.split("\`").join("").split("\"").join("").split("\'").join("");
    Users.update({ profile_info: info }, { where: { id } })
    .then(res => console.log("We updated users info succesfully"))
    .catch(err => { if(err) console.log("There was an error updating the data...")})
  }
}


module.exports = services;