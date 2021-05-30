const services = require("./services");

const controller = {

  setFavoriteTopic: async (req, res) => {
    const id = req.session?.userID;
    if (!id) res.json({ error: true, message: "There is no session for un/make this topic your favorite" });

    const topic = req.body.id;

    try {
      await services.toggleFavoriteTopic(id, topic);
      res.json({ error: false, message: "We updated succesfully the favorite status of this topic" })
    } catch (err) {
      console.log(err);
      res.json({ error: true, message: "We had a problem trying to update the favorite status of the topic" })
    }
  },
  createTopic: async (req, res) => {
    const id = req.session?.userID;
    if (!id) res.json({ error: true, message: "There is no session for creating a topic" });

    const { subject, intro } = req.body;

    try {
      await services.createTopicDB(id, subject, intro);
      res.json({ error: false, message: "The topic has been created succesfully" })
    } catch (err) {
      res.json({ error: true, message: "We had a problem trying to create the topic" })
    }
  },
  deleteTopic: async (req, res) => {
    const id = req.session?.userID;
    if (!id) res.json({ error: true, message: "There is no session for removing a topic" });

    const topic = req.body.id;

    try {
      await services.deleteTopicDB(id, topic);
      res.json({ error: false, message: "The topic has been deleted succesfully" })
    } catch (err) {
      res.json({ error: true, message: "We had a problem trying to delete the topic" })
    }
  },
  getTopic: async (req, res) => {
    const topicId = req.params.id;
    let topicData;
    let mainComments;
    try {
      [topicData] = await services.getTopicData(topicId);
      mainComments = await services.getMainComments(topicId);
    }
    catch (err) {
      if (err) res.json({ error: true, message: "There was a problem finding the topic" })
    }

    res.json({ error: false, message: "The topic was found succesfully", topic: topicData ?? false, comments: mainComments ?? [] });
  }
}

module.exports = controller;