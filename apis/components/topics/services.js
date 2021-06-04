const db = require("../../config/database");
const { Op } = require("sequelize");
const { Comments, Users, Topics } = require("../../config/sequelize_database");

const services = {

  toggleFavoriteTopic: async (id, topic) => {
    let { favorite_topics } = await Users.findOne({ attributes: ["favorite_topics"], where: { id }, raw: true });
    const alreadyHasTopic = favorite_topics.includes(topic);
    favorite_topics = JSON.parse(favorite_topics);

    if (alreadyHasTopic) {
      favorite_topics.splice(favorite_topics.indexOf(topic), 1)
    } else {
      favorite_topics.push(topic);
    }
    favorite_topics = JSON.stringify(favorite_topics);

    await Users.update({ favorite_topics }, { where: { id } })
  },

  createTopicDB: (author, subject, intro) => Topics.create({ author, subject, intro }),

  deleteTopicDB: (author, id) => Topics.destroy({ where: { [Op.and]: { author, id } } }),

  getTopicData: id => Topics.findAll({ where: { id }, raw: true }),

  getMainComments: async topic => {
    let comments = await Comments.findAll({ where: { [Op.and]: { topic, parent: null } }, raw: true });
    const authoredComments = [];
    for await (const comment of comments) {
      const data = await Users.findOne({ attributes: ["username"], where: { id: comment.author }, raw: true });
      const author = data?.username ?? "Anonimous";
      authoredComments.push({ ...comment, author });
    }
    
    return authoredComments;
  },

  getAllTopicsDB: async () => {
    const topics = await Topics.findAll({ raw: true });
    const topicsWithAuthor = [];
    for await (const topic of topics) {
      const authorRaw = await Users.findOne({ attributes: ["username"], where: { id: topic.author }, raw: true });
      const author = authorRaw?.username ?? "Anonimous";
      topicsWithAuthor.push({ ...topic, author });
    }

    return topicsWithAuthor;
  }

}


module.exports = services;