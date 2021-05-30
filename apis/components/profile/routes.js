const router = require("express").Router();
const db = require("../../config/database");
const upload = require("../../config/multer");
const controller = require("./controller");


router.get("/", controller.askForUserData);
router.put("/info", controller.updateUserInfo);
router.put("/avatar", upload.single("avatar"), controller.updateAvatar);


module.exports = router;