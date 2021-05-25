const services = require("./services");

const controller = {
  askForUserData: async (req, res) => {
    const id = req.session?.userID;
    if (!id) res.json({ error: true, message: "There's no id for getting user profile" });

    try {
      const result = await services.getUserData(id);
      res.json({ message: "We found the user profile with the id you asked", data: { ...result } });
    } catch (err) {
      if (err) res.json({ error: true, message: "We couldnt find the user with that id" })
    }
  },

  updateUserData: async (req, res) => {
    const id = req.session?.userID;
    if (!id) res.json({ message: "There is no session for updating this profile info" });
    
    const { info } = req.body;
    try {
      const result = await services.updateUserInfo(id, info);
      res.json({ message: "We updated the user info", data: info });
    }
    catch (err) {
      res.json({ error: true, message: "Couldnt update user's profile info" });
    }
  }
}

module.exports = controller;