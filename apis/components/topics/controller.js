const services = require("./services");

const controller = {
  getTopicSubComments: async (req, res) => {
    //GET children comment of a COMMENT
    const { parent } = req.params;
    try {
      const result = await services.getChildCommentsOf(parent);
      if (result.length) {
        res.json(result);
      }else{
        throw new Error();
      }
    } catch (err) {
      if (err) {
        res.json({ error: true, message: "The comment hasnt child or doesnt exist" })
      }
    }
  },
  setFavoriteTopic: async (req, res) => {
    const id = req.session?.userID;
    
    if (!id) res.json({ error:true, message: "There is no session for un/make this topic your favorite" });

    const { topic } = req.body;

    try {
      await services.toggleFavoriteTopic(id, topic);
      res.json({ error: false, message: "We updated succesfully the favorite status of this topic" })
    } catch (err) {
      console.log(err);
      res.json({ error: true, message: "We had a problem trying to update the favorite status of the topic" })
    }
  }
}

module.exports = controller;