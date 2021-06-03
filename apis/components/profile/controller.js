const services = require("./services");

const controller = {
  askForUserData: async (req, res) => {
    const id = req.session?.userID;

    if (!id) {
      res.json({ error: true, message: "There's no id for getting user profile" })
      return;
    }

    try {
      const result = await services.getUserDataDB(id);
      res.json({ error: false, message: "We found the user profile with the id you asked", data: { ...result } });
      return;
    } catch (err) {
      console.log(err);
      if (err) res.json({ error: true, message: "We couldnt find the user with that id" })
    }
  },

  updateUserInfo: async (req, res) => {
    const id = req.session?.userID;
    
    if (!id) {
      res.json({ error: true, message: "There is no session for updating this profile info" })
      return;
    }

    let { info } = req.body;
    try {
      info = info.split("\`").join("").split("\"").join("").split("\'").join("");
      await services.updateUserInfoDB(id, info);
      res.json({ error: false, message: "We updated the user info", data: info });
      return;
    }
    catch (err) {
      console.log(err);
      res.json({ error: true, message: "Couldnt update user's profile info" });
    }
  },

  updateAvatar: async (req, res) => {
    const id = req.session?.userID;
    
    if (!id) {
      res.json({ error: true, message: "There is no session for updating this avatar" })
      return;
    }

    try {
      await services.updateAvatarDB(id, req.file.path);
      res.json({ error: false, message: "We updated the user avatar succesfully" });
      return;
    }
    catch (err) {
      console.log(err);
      res.json({ error: true, message: "Couldnt update user's profile avatar" });
    }
  }
}

module.exports = controller;