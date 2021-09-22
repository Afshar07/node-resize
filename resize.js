const fs = require("fs");
const sharp = require("sharp");

module.exports = async function resize(path, format) {
  console.log(path);
  await sharp(path).jpeg({ mozjpeg: true }).rotate().toFile("../out.jpeg");
  fs.unlinkSync(path);
};
