const services = require("./services");

const controller = {

  setFavoriteTopic: async (req, res) => {
    const id = req.session?.userID;
    if (!id){
       res.json({ error: true, message: "There is no session for un/make this topic your favorite" });
       return;
    }

    const topic = req.body.id;

    try {
      await services.toggleFavoriteTopic(id, topic);
      res.json({ error: false, message: "We updated succesfully the favorite status of this topic" });
      return;
    } catch (err) {
      console.log(err);
      res.json({ error: true, message: "We had a problem trying to update the favorite status of the topic" })
    }
  },
  createTopic: async (req, res) => {
    const id = req.session?.userID;
    if (!id){
       res.json({ error: true, message: "There is no session for creating a topic" });
       return;
    }

    const { subject, intro } = req.body;

    try {
      await services.createTopicDB(id, subject, intro);
      res.json({ error: false, message: "The topic has been created succesfully" });
      return;
    } catch (err) {
      console.log(err);
      res.json({ error: true, message: "We had a problem trying to create the topic" })
    }
  },
  deleteTopic: async (req, res) => {
    const id = req.session?.userID;
    if (!id){
      res.json({ error: true, message: "There is no session for removing a topic" });
      return;
    } 

    const topic = req.body.id;

    try {
      await services.deleteTopicDB(id, topic);
      res.json({ error: false, message: "The topic has been deleted succesfully" });
      return;
    } catch (err) {
      console.log(err);
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
      res.json({ error: false, message: "The topic was found succesfully", topic: topicData ?? false, comments: mainComments ?? [] });
      return;
    }
    catch (err) {
      console.log(err);
      if (err) res.json({ error: true, message: "There was a problem finding the topic" });
    }
  },
  getAllTopics: async (req, res) => {
    try{
      const topics = await services.getAllTopicsDB();
      res.json({ error: false, message: "Here you got all the topics", data: topics });
      return;
    }catch(err){
      if(err){
        console.log(err);
        res.json({ error: true, message: "There was an error trying to get the topics" })
      }
    }
  }
}

module.exports = controller;