const express = require("express");
const app = express();
const apiRouter = express.Router();
const profileRouter = require("./apis/components/profile/routes");
const commentRouter = require("./apis/components/comments/routes");
const friendsRouter = require("./apis/components/friends/routes");


apiRouter.use("/profile", profileRouter);
apiRouter.use("/topics/comment", commentRouter);
apiRouter.use("/friends", friendsRouter);

module.exports = apiRouter;