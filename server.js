const express = require("express");
const app = express();
const db = require("./apis/config/database");
const session = require("express-session");
const PORT = null ?? 8000;
const sessionStore = require("./apis/config/cookie_db_connection");

//Routers
const apiRouter = require("./apiRouter");


app.use(express.static(`${__dirname}/build`));
app.use("/uploads", express.static(`${__dirname}/uploads`));
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
app.use("/api", apiRouter);


//TOPICS ---------------------------------------------

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

//---------------------------------------------------------




//INDEX GET 

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`,
    err => {
      if (err) console.log("There was an error sending the site " + err);
    });
});

//APP LISTEN

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
});
