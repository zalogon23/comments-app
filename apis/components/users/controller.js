const services = require("./services");

const controller = {
  askUser: async (req, res) => {
    
    const { id } = req.params;

    try {
      const result = await services.getUserFromDB(id);
      res.json({ error: false, message: "We found the user profile with the id you asked", data: { ...result } });
      return;
    } catch (err) {
      console.log(err);
      if (err) res.json({ error: true, message: "We couldnt find the user with that id" })
    }
  }
}

module.exports = controller;