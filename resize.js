const fs = require("fs");
const sharp = require("sharp");
const crypto = require("crypto");
const md5hash = crypto.createHash;

module.exports = async function resize(path, mimetype) {
  let imgFormat = mimetype.split("/");

  const filePath = `./resized/${md5hash("md5")
    .update("resizedAvatar")
    .digest("hex")}.${imgFormat[1]}`;

  await sharp(path).jpeg({ mozjpeg: true }).toFile(filePath);
  fs.unlinkSync(path);
  return filePath;
};
