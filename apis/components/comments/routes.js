const router = require("express").Router();
const db = require("../../config/database");
const controller = require("./controller");

router.post("/add", controller.addComment);
router.put("/info", controller.editComment);


module.exports = router;