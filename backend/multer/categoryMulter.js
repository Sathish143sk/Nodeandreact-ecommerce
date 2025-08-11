const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ensure folder
const dir = path.join(__dirname, "../uploads/categories");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

module.exports = multer({ storage });
