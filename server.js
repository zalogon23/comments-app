const express = require("express");
const app = express();
const mysql = require("mysql2");
const PORT = null ?? 8000;

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

//INDEX GET -------------------------------------------------------------

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`),
    err => {
      console.log("There was an error sending the site");
    };
});

//FRIENDS

//-------SHOW
app.post("/friends", async (req, res) => {
  const userID = req.body.id;
  let [{ friends }] = await getFriendIDs(userID);
  friends = JSON.parse(friends);
  let friendsData = [];

  for(const id of friends){
    const [ {id:userID, username, profile_image:avatar, profile_info:userData} ] = await getUserData(id);
    friendsData.push({userID, username, avatar, userData});
  }

  res.send(friendsData);
})

//-------ADD



//TOPICS

app.post("/topics/:id", async (req, res) => {
  const topicId = req.params.id;
  let topicData;
  let mainComments;
  try {
    [topicData] = await getTopicData(topicId);
    [mainComments] = await getMainComments(topicId);
  }
  catch (err) {
    res.send(err);
    return;
  }

  res.send({ topic: topicData, comments: mainComments ?? [] });
})

//LOGIN POST

app.post("/login", async (req, res) => {
  const userData = req.body;

  if (userData.username.length < 5) {
    res.send(JSON.stringify({ problem: "username", message: "The username doesnt exist" }));
    return;
  }

  if (userData.password.length < 5) {
    res.send(JSON.stringify({ problem: "password", message: "The password doesnt exist" }));
    return;
  }

  const usernameExist = await isUsernameAlreadyOnDB(userData);
  if (!usernameExist) {
    res.send(JSON.stringify({ problem: "username", message: "The username doesnt exist" }));
    return;
  }

  const [userDataRaw] = await isUsernamePasswordMatching(userData);
  if (!userDataRaw) {
    res.send(JSON.stringify({ problem: "password", message: "The password is wrong" }));
    return;
  }

  const userDataSecure = { ...userDataRaw, password: "que miras gato de mierda, esto fue escrito por el team de seguridad" };
  console.log(userDataSecure);
  res.send(JSON.stringify({ problem: false, message: "The user logged in succesfully", userdata: userDataSecure }));
})

//REGISTER POST

app.post("/register/sign", async (req, res) => {
  const userData = req.body;
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
    res.send(JSON.stringify({ problem: "password", message: "Error: You need to write a longer password... (min: 5 characters)" }));
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

//APP LISTEN -------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
});


//DB FUNCTIONS

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "maricuchaston",
  database: "app-db"
});

//-------------LOG--------
function registerUserOnDB({ username, password }) {
  const nowDate = new Date().toISOString().slice(0, 10);

  return new Promise((res, rej) => {
    db.query(`INSERT INTO users (username, password, register_date) VALUES ("${username}", "${password}", "${nowDate}")`, (err, result) => {
      if (err) {
        rej("There was an error registering this user");
      }
      res(`The user ${username} has been succesfully registered...`);
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
      console.log(result);
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

function getUserData(id){
  console.log(`SELECT * FROM users WHERE id=${id}`);
  return new Promise((res, rej) => {
    db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
      if (err) {
        rej("Couldnt get the user");
        return;
      }
      res(result);
    })
  })
}