const options = {
  host: "localhost",
  user: "root",
  password: "maricuchaston",
  database: "app-db"
};
const express = require("express");
const app = express();
const mysqlPromise = require("mysql2/promise");
const mysql = require("mysql2");
const promiseAdapter = require("express-mysql2-session-promise-adapter");
const connection = mysqlPromise.createConnection(options);
const db = mysql.createConnection(options);
const PORT = null ?? 8000;
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const sessionStore = new MySQLStore({}, promiseAdapter.default(connection));

app.use(express.static(`${__dirname}/build`));
app.use(session({
  secret: "algobienpinchelocoyquemao",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))
app.use(express.json());


//PROFILE

app.post("/profile", async (req, res) => {
  const id = req.session?.userID;
  if (!id) {
    res.send({ message: "There is no session for show a profile" })
  }
  try {
    const result = await getUserData(id);
    res.send(result);
  } catch (err) {
    if (err) console.log(err);
  }
})

app.put("/profile/info", async (req, res) => {
  const id = req.session?.userID;
  if (!id) {
    res.send({ message: "There is no session for updating this profile info" })
  }
  const { info } = req.body;
  const result = await updateUserInfo(id, info);
  res.send(result);
})

//COMMENTS

app.post("/topics/comment/add", async (req, res) => {
  const id = req.session?.userID;
  if (!id) {
    res.send({ message: "There is no session for making a comment" })
  }
  const result = await uploadCommentToDB(req.body, id);
  res.send(result);
})

app.put("/topics/comment/edit", async (req, res) => {
  const id = req.session?.userID;
  if (!id) {
    res.send({ message: "There is no session for updating the comment" })
  }
  const result = await updateCommentToDB(req.body, id);
  res.send(result);
})

//FRIENDS

//-------SHOW
app.post("/friends/all", async (req, res) => {
  const userID = req.session?.userID;
  if (!userID) {
    res.send({ message: "There is no session for show friends" })
  }
  let [{ friends }] = await getFriendIDs(userID);
  friends = JSON.parse(friends);
  let friendsData = [];

  for (const id of friends) {
    const result = await getUserData(id);
    friendsData.push(result);
  }

  res.send(friendsData);
})

//-------ADD

app.put("/friends/toggle", async (req, res) => {
  const userID = req.session?.userID;
  if (!userID) {
    res.send({ message: "There is no session for toggling friend" })
  }

  const { friendID } = req.body;

  const result = await toggleFriend(userID, friendID);

  res.send(result);
})

//TOPICS

app.get("/topics/:id", async (req, res) => {
  const topicId = req.params.id;
  let topicData;
  let mainComments;
  try {
    [topicData] = await getTopicData(topicId);
    mainComments = await getMainComments(topicId);
  }
  catch (err) {
    res.send(err);
    return;
  }

  res.send({ topic: topicData, comments: mainComments ?? [] });
})

app.post("/topics/comments", async (req, res) => {
  //GET children comment of a COMMENT
  const { topic, parent } = req.body;
  const result = await getChildCommentsOf(topic, parent);
  res.send(result);
})

app.put("/topics/favorite", async (req, res) => {
  const id = req.session?.userID;
  if (!id) {
    res.send({ message: "There is no session for un/make this topic your favorite" })
  }
  const { topic } = req.body;
  let result;

  try {
    result = await toggleFavoriteTopic(id, topic);
  } catch (err) {
    console.log(err);
  }
  res.send(result);
})

//LOGIN

app.post("/login", async (req, res) => {
  const id = req.session?.userID;
  if (id) {
    res.send({ message: "You are already logged in" })
    return;
  }

  const userData = req.body;

  if (userData.username.length < 5) {
    res.send(JSON.stringify({ problem: "username", message: "The username doesnt exist" }));
    return;
  }
  try {
    const usernameExist = await isUsernameAlreadyOnDB(userData);

    if (!usernameExist) {
      res.send(JSON.stringify({ problem: "username", message: "The username doesnt exist" }));
      return;
    }
  } catch (err) {
    if (err) console.log("Error with the username")
  }

  try {
    const [userDataRaw] = await isUsernamePasswordMatching(userData);
    if (!userDataRaw) {
      res.send(JSON.stringify({ problem: "password", message: "The password is wrong" }));
      return;
    }

    const userDataSecure = { ...userDataRaw, password: "que miras gato de mierda, esto fue escrito por el team de seguridad" };
    req.session.userID = userDataSecure.id;
    res.send(JSON.stringify({ problem: false, message: "The user logged in succesfully", userdata: userDataSecure }));

  } catch (err) {
    if (err) console.log("Problem matching the password")
  }
})

//LOGOUT

app.post("/logout", (req, res) => {
  const id = req.session?.userID;
  if (!id) {
    res.send({ message: "There is no session for log out" })
  }

  console.log

  req.session.destroy();
  res.clearCookie("connect.sid");
  res.send("You logged out")
})

//REGISTER

app.post("/register", async (req, res) => {
  let userData = req.body;
  if (userData.username.length < 5) {
    res.send(JSON.stringify({ problem: "username", message: "The username is too short (min: 5 characters)" }));
    return;
  }
  const isUserRegistered = await isUsernameAlreadyOnDB(userData);

  if (isUserRegistered) {
    res.send(JSON.stringify({ problem: "username", message: "The username already exists" }));
    return;
  }
  if (userData.password.length < 5) {
    res.send(JSON.stringify({ problem: "password", message: "The password is too short (min: 5 characters)" }));
    return;
  }
  try {
    const result = await registerUserOnDB(userData);
    res.send(result);
  }
  catch (err) {
    res.send(err);
    console.log(err);
  }
})


//INDEX GET -------------------------------------------------------------

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`,
    err => {
      if (err) console.log("There was an error sending the site " + err);
    });
});

//APP LISTEN -------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
});


//DB FUNCTIONS


//-------------LOG--------
function registerUserOnDB({ username, password }) {
  const nowDate = new Date().toISOString().slice(0, 10);

  return new Promise((res, rej) => {
    db.query(`INSERT INTO users (username, password, register_date) VALUES ("${username}", "${password}", "${nowDate}")`, (err, result) => {
      if (err) {
        rej(JSON.stringify({ problem: "database", message: "There was an error registering this user" }));
      }
      res(JSON.stringify({ message: `The user ${username} has been succesfully registered...` }));
    })
  })
}

function isUsernameAlreadyOnDB({ username }) {
  return new Promise((res, rej) => {
    db.query(`SELECT username FROM users WHERE username="${username}"`, (err, result) => {
      res(!!(result.length))
    });
  })
}

function isUsernamePasswordMatching({ username, password }) {
  return new Promise((res, rej) => {
    db.query(`SELECT * FROM users WHERE username="${username}" AND password="${password}"`, (err, result) => {
      res(result);
    });
  })
}

//-----------TOPIC---------------

function getTopicData(id) {
  return new Promise((res, rej) => {
    db.query(`SELECT * FROM topics WHERE id=${id}`, (err, result) => {
      if (err) {
        rej("Couldnt get the topic");
        return;
      }
      res(result);
    })
  })
}

function getMainComments(id) {
  return new Promise((res, rej) => {
    db.query(`SELECT * FROM comments WHERE topic=${id} AND parent IS NULL`, (err, result) => {
      if (err) {
        rej("Couldnt get the comments");
        return;
      }
      res(result);
    })
  })
}

function toggleFavoriteTopic(userID, topic) {
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

function getChildCommentsOf(topic, parent) {
  return new Promise((res, rej) => {
    db.query(`SELECT * FROM comments WHERE topic=${topic} AND parent=${parent}`, (err, result) => {
      if (err) {
        rej("Couldnt get the child comments");
        return;
      }
      res(result);
    })
  })
}

//-------FRIENDS--------------

function getFriendIDs(id) {
  return new Promise((res, rej) => {
    db.query(`SELECT friends FROM users WHERE id=${id}`, (err, result) => {
      if (err) {
        rej("Couldnt get the friends");
        return;
      }
      res(result);
    })
  })
}

function getUserData(id) {
  return new Promise((res, rej) => {
    db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
      if (err) {
        rej("Couldnt get the user");
        return;
      }
      const [{ id, username, profile_image, profile_info, favorite_topics }] = result;
      res({ id, username, profile_image, profile_info, favorite_topics });
    })
  })
}

function toggleFriend(userID, friendID) {
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

//COMMENTS

function uploadCommentToDB({ content, parent, topic }, author) {
  return new Promise((res, rej) => {
    db.query(`INSERT INTO comments (content, author, parent, topic) VALUES("${content}", ${author}, ${parent}, ${topic})`, (err, result) => {
      if (err) {
        rej("Couldnt upload the comment");
        return;
      }
      res("The comment has been added succesfully");
    })
  })
}

function updateCommentToDB({ content }, id) {
  return new Promise((res, rej) => {
    db.query(`UPDATE comments SET content="${content}" WHERE id=${id}`, (err, result) => {
      if (err) {
        rej("Couldnt update the comment");
        return;
      }
      res("The comment has been updated succesfully");
    })
  })
}

//PROFILE

function updateUserInfo(id, info) {
  info = info.split("\`").join("").split("\"").join("").split("\'").join("");
  return new Promise((res, rej) => {
    console.log(`UPDATE users SET profile_info="${info}" WHERE id=${id}`);
    db.query(`UPDATE users SET profile_info="${info}" WHERE id=${id}`, (err, result) => {
      if (err) {
        rej(JSON.stringify({
          message: "Couldnt update the profile info"
        }));
        return;
      }
      res(JSON.stringify({
        message: "The profile info has been succesfully updated",
        content: info
      }));
    })
  })
}