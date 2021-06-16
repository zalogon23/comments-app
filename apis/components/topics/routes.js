const router = require("express").Router();
const controller = require("./controller");

router.put("/favorite", controller.setFavoriteTopic);
router.put("/", controller.updateTopic);
router.post("/", controller.createTopic);
router.get("/search/:search", controller.getSearchedTopics);
router.get("/:id", controller.getTopic);
router.get("/", controller.getAllTopics);
router.delete("/", controller.deleteTopic);


module.exports = router;