const router = require("express").Router();
const controller = require("./controller");

router.post("/login", controller.loginUser);
router.post("/logout", controller.logoutUser);
router.post("/register", controller.registerUser);


module.exports = router;