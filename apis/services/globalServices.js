const db = require("../config/database");

const globalServices = {
  getUserData: function (id) {
    return new Promise((res, rej) => {
      if (typeof id !== "number") {
        rej();
        return;
      }
      db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
        if (err) {
          rej();
          return;
        }
        const [{ id, username, profile_image, profile_info, favorite_topics }] = result;
        res({ id, username, profile_image, profile_info, favorite_topics });
        return;
      })
    })
  }
}

module.exports = globalServices;