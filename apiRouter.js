const express = require("express");
const app = express();
const apiRouter = express.Router();
const profileRouter = require("./apis/components/profile/routes");
const commentRouter = require("./apis/components/comments/routes");
const friendsRouter = require("./apis/components/friends/routes");
const logRouter = require("./apis/components/log/routes");
const topicsRouter = require("./apis/components/topics/routes");


apiRouter.use("/profile", profileRouter);
apiRouter.use("/comment", commentRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/friends", friendsRouter);
apiRouter.use("/", logRouter);

module.exports = apiRouter;