const router = require("express").Router();
const controller = require("./controller");

router.get("/comment/:parent", controller.getTopicSubComments);
router.put("/favorite", controller.setFavoriteTopic);
router.post("/", controller.createTopic);
router.delete("/", controller.deleteTopic);


module.exports = router;