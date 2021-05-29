const router = require("express").Router();
const controller = require("./controller");

router.post("/comments", controller.getTopicSubComments);
router.put("/favorite", controller.setFavoriteTopic);


module.exports = router;