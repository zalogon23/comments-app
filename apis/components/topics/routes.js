const router = require("express").Router();
const controller = require("./controller");

router.put("/favorite", controller.setFavoriteTopic);
router.post("/", controller.createTopic);
router.delete("/", controller.deleteTopic);


module.exports = router;