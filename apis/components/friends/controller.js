const services = require("./services");

const controller = {
  getAllFriendsOf: async (req, res) => {
    const userID = req.session?.userID;
    if (!userID) {
      res.send({ message: "There is no session for show friends" })
    }
    let [{ friends }] = await services.getFriendIDs(userID);
    friends = JSON.parse(friends);
    let friendsData = [];
  
    for (const id of friends) {
      const result = await services.getUserData(id);
      friendsData.push(result);
    }
  
    res.send(friendsData);
  },
  toggleFriendStatus: async (req, res) => {
    const userID = req.session?.userID;
    if (!userID) {
      res.send({ message: "There is no session for toggling friend" })
    }
  
    const { friendID } = req.body;
  
    const result = await services.toggleFriend(userID, friendID);
  
    res.send(result);
  }
  
}

module.exports = controller;