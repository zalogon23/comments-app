const db = require("../../config/database");

const services = {
  getChildCommentsOf: function(topic, parent) {
    return new Promise((res, rej) => {
      db.query(`SELECT * FROM comments WHERE topic=${topic} AND parent=${parent}`, (err, result) => {
        if (err) {
          rej("Couldnt get the child comments");
          return;
        }
        res(result);
      })
    })
  },
  toggleFavoriteTopic: function(userID, topic) {
    return new Promise((res, rej) => {
      db.query(`SELECT favorite_topics FROM users WHERE id=${userID}`, (err, result) => {
        if (err) {
          rej("Couldnt find your favorite topics");
          return;
        }
  
        let [{ favorite_topics }] = result;
        const alreadyHasTopic = favorite_topics.includes(topic);
        favorite_topics = JSON.parse(favorite_topics);
  
        if (alreadyHasTopic) {
          favorite_topics.splice(favorite_topics.indexOf(topic), 1)
        } else {
          favorite_topics.push(topic);
        }
  
        db.query(`UPDATE users SET favorite_topics="${JSON.stringify(favorite_topics)}" WHERE id=${userID}`, (err, result) => {
          if (err) {
            rej("Couldnt update the favorite topics after modifying it");
            return;
          }
  
          res("The favorite topics has been updated");
        })
      })
    })
  }
}


module.exports = services;