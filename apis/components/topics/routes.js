const router = require("express").Router();
const controller = require("./controller");

router.get("/comment/:parent", controller.getTopicSubComments);
router.put("/favorite", controller.setFavoriteTopic);
router.post("/", controller.createTopic);


module.exports = router;