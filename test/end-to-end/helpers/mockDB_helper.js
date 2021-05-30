const db = require("../../../apis/config/database");

const dbHelper = {
  getProfileInfo: function() {
    return new Promise((resolve, reject) => {
      db.query("SELECT profile_info FROM users WHERE id=1", (err, result) => {
        if (err) reject(new Error("Error selecting the PROFILE INFO in complementary function"));
        resolve(result);
      })
    })
  }
}

module.exports = dbHelper;