const fs = require("fs");
const sharp = require("sharp");
const crypto = require("crypto");

module.exports = async function resize(path, mimetype) {
  let imgFormat = mimetype.split("/");
  const filePath = `./resized/${crypto.createHash("md5")
    .update("resizedAvatar")
    .digest("hex")}.${imgFormat[1]}`;

  await sharp(path).jpeg({ mozjpeg: true }).toFile(filePath);
  fs.unlinkSync(path);
  return filePath;
};
