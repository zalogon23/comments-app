const services = require("./services");

const controller = {
  getAllFriendsOf: async (req, res) => {
    const userID = req.session?.userID;
    if (!userID) res.json({ error: true, message: "There is no session for show friends" });
    try {
      let [{ friends }] = await services.getFriendIDs(userID);
      friends = JSON.parse(friends);
      console.log(friends);
      const friendsData = [];

      for (const id of friends) {
        const result = await services.getUserData(id);
        friendsData.push(result);
      }

      res.json(friendsData);
    } catch (err) {
      if (err) {
        res.json({ error: true, message: "There was an error getting your friends" })
      }
    }
  },
  toggleFriendStatus: async (req, res) => {
    const userID = req.session?.userID;
    if (!userID) res.json({ error: true, message: "There is no session for toggling friend" });

    const { id } = req.body;

    try {
      await services.toggleFriend(userID, id);
      res.json({ error: false, message: "The friends has been succesfully toggled"});
    } catch (err) {
      if(err){
        res.json({ error: true, message: "There was a problem toggling the friend"});
      }
    }
  }

}

module.exports = controller;