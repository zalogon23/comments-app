const router = require("express").Router();
const db = require("../../config/database");
const controller = require("./controller");

router.post("/", controller.addComment);
router.put("/", controller.editComment);


module.exports = router;