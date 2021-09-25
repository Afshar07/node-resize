const fs = require("fs");
const sharp = require("sharp");

module.exports = async function resize(path, mimetype) {
  let imgFormat = mimetype.split("/");
  await sharp(path)
    .jpeg({ mozjpeg: true })
    .toFile(`./resized/resizedAvatar.${imgFormat[1]}`);
  fs.unlinkSync(path);
  return `./resized/resizedAvatar.${imgFormat[1]}`;
};
