const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.getAllFriendsOf);
router.put("/", controller.toggleFriendStatus);


module.exports = router;