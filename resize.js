const fs = require("fs");
const sharp = require("sharp");

module.exports = async function resize(path, mimetype) {
  let imgFormat = mimetype.split("/");
  await sharp(path)
    .jpeg({ mozjpeg: true })
    .toFile(`./resized/resizedAvatar.${imgFormat[1]}`);
  fs.unlink(`./resized/resizedAvatar.${imgFormat[1]}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return `./resized/resizedAvatar.${imgFormat[1]}`;
};
