const { Op } = require("sequelize");
const { Users } = require("../../config/sequelize_database");

const services = {

  getUserFromDB: id => Users.findOne({ attributes: { exclude: ["password"] }, where: { id }, raw: true }),

  emailOnDB: email => Users.findOne({ attributes: [ "id" ], where: { email }, raw: true }),

  setResetKey: (resetKey, id) => Users.update({ resetKey }, { where: { id } }),

  setNewPassword: (password, id) => Users.update({ password, resetKey: null }, { where: { id } }),

  matchResetKey: async (resetKey, id) => {
    if(Number.isNaN(+id)) return false;
    let anyUser = await Users.findOne({where: {[Op.and]: { resetKey, id }}, raw: true}).catch(err => {
      console.log(err);
      anyUser = null;
    });
    if(!anyUser) return false;
    return true;
  }
  
}


module.exports = services;