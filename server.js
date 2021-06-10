const express = require("express");
const app = express();
const session = require("express-session");
const PORT = process.env.PORT ?? 8000;
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
