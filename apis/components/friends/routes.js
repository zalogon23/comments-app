const router = require("express").Router();
const db = require("../../config/database");
const controller = require("./controller");

router.post("/all", controller.getAllFriendsOf);
router.put("/toggle", controller.toggleFriendStatus);


module.exports = router;