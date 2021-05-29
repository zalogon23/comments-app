const router = require("express").Router();
const db = require("../../config/database");
const controller = require("./controller");

router.get("/", controller.getAllFriendsOf);
router.put("/", controller.toggleFriendStatus);


module.exports = router;