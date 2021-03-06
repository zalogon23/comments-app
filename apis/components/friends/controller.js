const services = require("./services");

const controller = {
  getAllFriendsOf: async (req, res) => {
    const userID = req.session?.userID;
    if (!userID){ 
      res.json({ error: true, message: "There is no session for show friends" });
      return;
    }
    try {
      let { friends } = await services.getFriendIDs(userID);
      friends = JSON.parse(friends);
      const friendsData = [];

      for (const id of friends) {
        const result = await services.getUserData(id);
        friendsData.push(result);
      }

      res.json({ error: false, message: "Here you got the user friends", data: friendsData });
      return;

    } catch (err) {
      if (err) {
        console.log(err);
        res.json({ error: true, message: "There was an error getting your friends" })
      }
    }
  },
  toggleFriendStatus: async (req, res) => {
    const userID = req.session?.userID;
    if (!userID){
      res.json({ error: true, message: "There is no session for toggling friend" });
      return;
    } 

    const { id } = req.body;

    try {
      await services.toggleFriend(userID, id);
      res.json({ error: false, message: "The friends has been succesfully toggled"});
      return;
    } catch (err) {
      if(err){
        console.log(err);
        res.json({ error: true, message: "There was a problem toggling the friend"});
      }
    }
  }

}

module.exports = controller;