const router = require("express").Router();
const db = require("../../config/database");
const controller = require("./controller");

router.post("/", controller.askForUserData);
router.put("/info", controller.updateUserData);


module.exports = router;