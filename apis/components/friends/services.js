const db = require("../../config/database");
const globalServices = require("../../services/globalServices");

const services = {
  getFriendIDs: function (id) {
    return new Promise((res, rej) => {
      db.query(`SELECT friends FROM users WHERE id=${id}`, (err, result) => {
        if (err) {
          rej("Couldnt get the friends");
          return;
        }
        res(result);
      })
    })
  },
  getUserData: globalServices.getUserData,
  toggleFriend: function (userID, friendID) {
    return new Promise((res, rej) => {
      db.query(`SELECT friends FROM users WHERE id=${userID}`, (err, result) => {
        if (err) {
          rej("Couldnt find your profile to add the new friend");
          return;
        }
        let [{ friends }] = result;
        friends = JSON.parse(friends);
        const alreadyFriends = friends.includes(friendID);

        if (alreadyFriends) {
          friends.splice(friends.indexOf(friendID), 1);
          _toggleFriendship(userID, friendID, friends, true);
          return;
        }

        friends.push(friendID);
        _toggleFriendship(userID, friendID, friends, false);


        function _toggleFriendship(user, friend, friends, already) {
          friends = JSON.stringify(friends);
          db.query(`UPDATE users SET friends="${friends}" WHERE id=${user}`, (err, result) => {
            if (err) {
              rej("Couldnt remove friend from the list of friends");
              return;
            }
            res(already ? `Your friend ${friend} has been removed` : `Your new friend ${friend} has been added`);
          });
        }
      })
    })
  }
}


module.exports = services;