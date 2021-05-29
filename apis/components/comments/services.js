const db = require("../../config/database");
const { Op } = require("sequelize");
const { Comments } = require("../../config/sequelize_database");

const services = {
  addCommentDB: async ({ content, parent = null, topic }, author) => {
    const { dataValues } = await Comments.create({ content, author, parent, topic });
    const { id } = dataValues; 
    if(parent){
      let content = await Comments.findAll({ attributes: [ "children" ], where: { id: parent }, raw: true });
      let [{ children }] = content;
      children = JSON.parse(children);
      children.push(id);
      children = JSON.stringify(children);
      await Comments.update({ children }, { where: { id: parent } } )
    }
  },
  updateCommentDB: ({ content, id }, author) => Comments.update({ content }, { where: { [Op.and]: { id, author } } })
}


module.exports = services;