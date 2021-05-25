const db = require("../../config/database");
const globalServices = require("../../services/globalServices");

const services = {
  getUserData: globalServices.getUserData,
  updateUserInfo: function (id, info) {
    info = info.split("\`").join("").split("\"").join("").split("\'").join("");
    return new Promise((res, rej) => {
      db.query(`UPDATE users SET profile_info="${info}" WHERE id=${id}`, (err, result) => {
        if (err) {
          rej();
          return;
        }
        res(info);
        return;
      })
    })
  }
}


module.exports = services;