const db = require("../../config/database");
const { Users } = require("../../config/sequelize_database");
const globalServices = require("../../services/globalServices");

const services = {

  getFriendIDs: (id) => Users.findAll({ attributes: ["friends"], where: { id }, raw: true }),

  getUserData: globalServices.getUserData,

  toggleFriend: async (userID, friendID) => {

    const content = await Users.findAll({ attributes: ["friends"], where: { id: userID } });
    let [{ friends }] = content;
    friends = JSON.parse(friends);
    const alreadyFriends = friends.includes(friendID);

    if (alreadyFriends) {
      friends.splice(friends.indexOf(friendID), 1);
      return _toggleFriendship(userID, friendID, friends);
    }

    friends.push(friendID);
    return _toggleFriendship(userID, friendID, friends);


    function _toggleFriendship(id, friend, friends) {
      friends = JSON.stringify(friends);
      return Users.update({ friends }, { where: { id } })
    }
  }
}


module.exports = services;