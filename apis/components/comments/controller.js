const services = require("./services");

const controller = {
  addComment: async (req, res) => {
    const id = req.session?.userID;
    if (!id) res.json({error: true,  message: "There is no session for making a comment" });

    try {
      await services.addCommentDB(req.body, id);
      res.json({ error: false, message: "The comment has been added succesfully" });
    } catch (err) {
      if (err) {
        res.json({ error: true, message: "There was an error uploading the comment" });
      }
    }
  },
  editComment: async (req, res) => {
    const id = req.session?.userID;
    if (!id) res.json({error: true, message: "There is no session for updating the comment" });
    try{
      await services.updateCommentDB(req.body, id);
      res.json({ error: false, message: "The comment has been updated succesfully" });
    }catch(err){
      if(err){
        res.json({ error: true, message: "There was a problem updating the comment" });
      }
    }
  }
}

module.exports = controller;