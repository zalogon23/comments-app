const services = require("./services");

const controller = {
  getTopicSubComments: async (req, res) => {
    //GET children comment of a COMMENT
    const { topic, parent } = req.body;
    const result = await services.getChildCommentsOf(topic, parent);
    res.send(result);
  },
  setFavoriteTopic: async (req, res) => {
    const id = req.session?.userID;
    if (!id) {
      res.send({ message: "There is no session for un/make this topic your favorite" })
    }
    const { topic } = req.body;
    let result;
  
    try {
      result = await services.toggleFavoriteTopic(id, topic);
    } catch (err) {
      console.log(err);
    }
    res.send(result);
  }
}

module.exports = controller;