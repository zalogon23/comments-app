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
  updateCommentDB: ({ content, id }, author) => Comments.update({ content }, { where: { [Op.and]: { id, author } } }),
  removeCommentDB: async (id, author) => {
    const parentResult = await Comments.findAll({ attributes: [ "parent" ], where: { id }, raw: true });
    const [{ parent }] = parentResult;   
    await Comments.destroy({ where: { [Op.and]: { id, author } } })
    if(parent === null) return;
    const childrenResult = await Comments.findAll({ attributes: [ "children" ], where: { id: parent }, raw: true });
    let [{ children }] = childrenResult;
    children = JSON.parse(children);
    children.splice(children.indexOf(id), 1);
    Comments.update({ children: JSON.stringify(children) }, { where: { id: parent } })
  } 
}


module.exports = services;