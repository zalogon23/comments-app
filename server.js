const express = require("express");
const app = express();
const db = require("./apis/config/database");
const session = require("express-session");
const PORT = null ?? 8000;
const sessionStore = require("./apis/config/cookie_db_connection");

//Routers
const profileRouter = require("./apis/components/profile/routes");
const commentRouter = require("./apis/components/comments/routes");
const friendsRouter = require("./apis/components/friends/routes");


app.use(express.static(`${__dirname}/build`));
app.use(session({
  secret: "algobienpinchelocoyquemao",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: false
  }
}))
app.use(express.json());

//ROUTES
app.use("/profile", profileRouter);
app.use("/topics/comment", commentRouter);
app.use("/friends", friendsRouter);


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
