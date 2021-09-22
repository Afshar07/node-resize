const express = require("express");
const router = express.Router();
const multer = require("multer");
const resize = require("../../resize");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  },
});
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    callback(null, true);
  } else {
    callback(new Error("فرمت فایل ارسالی مناسب نیست"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

router.post("/", upload.single("avatar"), (req, res, next) => {
  resize(req.file.path, "jpeg");
  res.status(200).json({
    message: "File Received",
  });
});

module.exports = router;
