const services = require("./services");

const controller = {
  getCommentChildren: async (req, res) => {
    const { parent } = req.params;
    try {
      const result = await services.getChildCommentsOf(false, parent);
      if (result.length) {
        res.json(result);
        return
      }
      throw new Error();
    } catch (err) {
      if (err) {
        console.log(err);
        res.json({ error: true, message: "The comment hasnt child or doesnt exist" })
      }
    }
  },
  addComment: async (req, res) => {
    const id = req.session?.userID;
    if (!id){
      res.json({ error: true, message: "There is no session for making a comment" });
      return;
    }

    try {
      const result = await services.addCommentDB(req.body, id);
      res.json({ error: false, message: "The comment has been added succesfully", data: result });
      return;
    } catch (err) {
      if (err) {
        console.log(err);
        res.json({ error: true, message: "There was an error uploading the comment" });
      }
    }
  },
  editComment: async (req, res) => {
    const id = req.session?.userID;
    if (!id){
      res.json({ error: true, message: "There is no session for updating the comment" });
      return;
    }
    try {
      await services.updateCommentDB(req.body, id);
      res.json({ error: false, message: "The comment has been updated succesfully" });
      return;
    } catch (err) {
      if (err) {
        console.log(err);
        res.json({ error: true, message: "There was a problem updating the comment" });
      }
    }
  },
  deleteComment: async (req, res) => {
    const id = req.session?.userID;
    if (!id){
      res.json({ error: true, message: "There is no session for deleting the comment" }); 
      return;
    } 
    try {
      await services.removeCommentDB(req.body.id, id);
      res.json({ error: false, message: "The comment has been removed succesfully" });
      return;
    } catch (err) {
      if (err) {
        console.log(err);
        res.json({ error: true, message: "There was a problem trying to remove the comment..." });
      }
    }
  }
}

module.exports = controller;