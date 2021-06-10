const router = require("express").Router();
const controller = require("./controller");


router.get("/:id", controller.askUser);

module.exports = router;