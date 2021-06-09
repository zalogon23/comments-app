const { Users } = require("../../config/sequelize_database");
const globalServices = require("../../services/globalServices");

const services = {

  getFriendIDs: (id) => Users.findOne({ attributes: ["friends"], where: { id }, raw: true }),

  getUserData: globalServices.getUserData,

  toggleFriend: async (userID, friendID) => {

    const contentUser = await Users.findAll({ attributes: ["friends"], where: { id: userID } });
    let [{ friends }] = contentUser;
    const contentFriend = await Users.findAll({ attributes: ["friends"], where: { id: userID } });
    let friendsFriend = contentFriend[0].friends;
    friends = JSON.parse(friends);
    friendsFriend = JSON.parse(friendsFriend);
    const alreadyFriends = friends.includes(friendID);

    if (alreadyFriends) {
      friends.splice(friends.indexOf(friendID), 1);
      friendsFriend.splice(friendsFriend.indexOf(userID), 1);
      await _toggleFriendship(userID, friends);
      await _toggleFriendship(friendID, friendsFriend);
      return
    }

    friends.push(friendID);
    friendsFriend.push(userID);
    await _toggleFriendship(userID, friends);
    await _toggleFriendship(friendID, friendsFriend);

    function _toggleFriendship(id, friends) {
      friends = JSON.stringify(friends);
      return Users.update({ friends }, { where: { id } })
    }
  }
}


module.exports = services;