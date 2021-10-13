const express = require("express");
const router = express.Router();
const multer = require("multer");
const resize = require("../../resize");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    let rand = Math.floor(Math.random() * 100000);
    callback(null, new Date().toISOString() + rand + file.originalname);
  },
});
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
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

router.post("/", upload.single("avatar"), async (req, res, next) => {
  let newAvatarPath = await resize(req.file.path, req.file.filename);
  const formData = new FormData();
  let formHeaders = formData.getHeaders();
  formData.append("avatar", fs.createReadStream(newAvatarPath));
  try {
    const response = await axios.post(
      `${process.env.API_BASE}/api/user/avatar/upload`,

      formData,

      {
        headers: {
          Authorization: `Bearer ${req.body.token}`,
          ...formHeaders,
        },
      }
    );
    if (response.status === 200) {
      res.status(response.status).json(response.data);
      fs.unlinkSync(`./resized/${req.file.filename}`);
    }
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
    fs.unlink(`./resized/${req.file.filename}}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

module.exports = router;
