const router = require("express").Router();
const controller = require("./controller");


router.get("/:id", controller.askUser);
router.post("/reset", controller.sendResetEmail);
router.put("/reset", controller.updatePassword);

module.exports = router;