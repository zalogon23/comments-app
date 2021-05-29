const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const now = Date.now();
    cb(null, now + file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;