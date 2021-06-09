const { Op } = require("sequelize");
const { Users, Comments } = require("../config/sequelize_database"); 

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
  },
  getCommentsWithParent: async ( topic, parent ) => {
    let comments;
    if(topic){
      comments = await Comments.findAll({ where: { [Op.and]: { topic, parent } }, raw: true });
    }else{
      comments = await Comments.findAll({ where: { parent }, raw: true });
    }
  
    const authoredComments = [];
    for await (const comment of comments) {
      const data = await Users.findOne({ attributes: ["username"], where: { id: comment.author }, raw: true });
      const authorName = data?.username ?? "Anonimous";
      authoredComments.push({ ...comment, authorName });
    }
    
      console.log(authoredComments)
    return authoredComments;
  }
}

module.exports = globalServices;