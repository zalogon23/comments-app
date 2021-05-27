const db = require("../config/database");
const { Users } = require("../config/sequelize_database");

const globalServices = {
  getUserData: function (id) {
    if (typeof id !== "number") throw new Error();
    return Users.findOne({
      raw: true,
      attributes: {
        exclude: ["password"]
      },
      where: { id }
    })
  }
}

module.exports = globalServices;