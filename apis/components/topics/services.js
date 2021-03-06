const { Op } = require("sequelize");
const { Comments, Users, Topics } = require("../../config/sequelize_database");
const globalServices = require("../../services/globalServices");

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

  updateTopicDB: (id, content, author) => Topics.update({ intro: content }, { where: { [Op.and] : { id, author } } }),

  getTopicData: async id => {
    let topic = await Topics.findOne({ where: { id }, raw: true }).catch(err => { console.log(err); return });
    const authorRaw = await Users.findOne({ attributes: ["username"], where: { id: topic.author }, raw: true });
    const authorName = authorRaw?.username ?? "Anonimous";
    topic = { ...topic, authorName };
    return topic
  },

  getCommentsWithParent: globalServices.getCommentsWithParent,

  getAllTopicsDB: async () => {
    const topics = await Topics.findAll({ raw: true });
    const topicsWithAuthor = [];
    for await (const topic of topics) {
      const authorRaw = await Users.findOne({ attributes: ["username"], where: { id: topic.author }, raw: true });
      const authorName = authorRaw?.username ?? "Anonimous";
      topicsWithAuthor.push({ ...topic, authorName });
    }

    return topicsWithAuthor;
  },

  getSearchedTopicsDB: async (search) => {
    console.log("Esto me esta llegando!!!!:  " + search);
    const topics = await Topics.findAll({where: { subject:{ [Op.like]: `${search}%` } }, raw: true });
    const topicsWithAuthor = [];
    for await (const topic of topics) {
      const authorRaw = await Users.findOne({ attributes: ["username"], where: { id: topic.author }, raw: true });
      const authorName = authorRaw?.username ?? "Anonimous";
      topicsWithAuthor.push({ ...topic, authorName });
    }

    return topicsWithAuthor;
  }

}


module.exports = services;