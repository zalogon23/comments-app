const router = require("express").Router();
const db = require("../../config/database");
const controller = require("./controller");

router.post("/", controller.addComment);
router.put("/", controller.editComment);
router.delete("/", controller.deleteComment);

module.exports = router;