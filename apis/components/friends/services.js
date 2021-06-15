const { Users } = require("../../config/sequelize_database");
const globalServices = require("../../services/globalServices");

const services = {

  getFriendIDs: (id) => Users.findOne({ attributes: ["friends"], where: { id }, raw: true }),

  getUserData: globalServices.getUserData,

  toggleFriend: async (userID, friendID) => {

    const contentUser = await Users.findOne({ attributes: ["friends"], where: { id: userID }, raw: true });
    let { friends } = contentUser;
    const contentFriend = await Users.findOne({ attributes: ["friends"], where: { id: friendID }, raw: true });
    let friendFriends = contentFriend.friends;
    friends = JSON.parse(friends);
    friendFriends = JSON.parse(friendFriends);
    const alreadyFriends = friends.includes(friendID);

    if (alreadyFriends) {
      friends.splice(friends.indexOf(friendID), 1);
      friendFriends.splice(friendFriends.indexOf(userID), 1);
      await _toggleFriendship(userID, friends);
      await _toggleFriendship(friendID, friendFriends);
      return
    }

    friends.push(friendID);
    friendFriends.push(userID);
    await _toggleFriendship(userID, friends);
    await _toggleFriendship(friendID, friendFriends);

    function _toggleFriendship(id, friends) {
      friends = JSON.stringify(friends);
      return Users.update({ friends }, { where: { id } })
    }
  }
}


module.exports = services;