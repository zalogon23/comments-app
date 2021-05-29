const db = require("../../config/database");

const services = {
  addCommentDB: function ({ content, parent = null, topic }, author) {
    return new Promise((res, rej) => {
      db.query(`INSERT INTO comments (content, author, parent, topic) VALUES("${content}", ${author}, ${parent}, ${topic})`, (err, result) => {
        if (err) {
          rej("Couldnt upload the comment");
          return;
        }
        res("The comment has been added succesfully");
      })
    })
  },
  updateCommentDB: function ({ content, id }, authorID) {
    return new Promise((res, rej) => {
      db.query(`UPDATE comments SET content="${content}" WHERE id=${id} AND author=${authorID}`, (err, result) => {
        if (err) {
          rej("Couldnt update the comment");
          return;
        }
        res("The comment has been updated succesfully");
      })
    })
  }
}


module.exports = services;