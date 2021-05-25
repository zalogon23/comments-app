const services = require("./services");

const controller = {
  addComment: async (req, res) => {
    const id = req.session?.userID;
    if (!id) {
      res.send({ message: "There is no session for making a comment" })
    }
    const result = await services.addCommentDB(req.body, id);
    res.send(result);
  },
  editComment: async (req, res) => {
    const id = req.session?.userID;
    if (!id) {
      res.send({ message: "There is no session for updating the comment" })
    }
    const result = await services.updateCommentDB(req.body, id);
    res.send(result);
  }
}

module.exports = controller;