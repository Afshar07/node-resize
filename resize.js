const fs = require("fs");
const sharp = require("sharp");
const logger = require("./logger");

module.exports = async function resize(path, name) {
  // Set quality to this at first and compress image once
  let firstSize = fs.statSync(path).size;
  let firstLog = `${(firstSize / 1024).toFixed(2)} KB`;
  if (firstSize >= 1024 * 1024) {
    firstSize = firstSize / (1024 * 1024);
    firstLog = `${firstSize.toFixed(2)} MB`;
  }

  let quality = 80;
  await sharp(path)
    .jpeg({ mozjpeg: true, quality })
    .toFile(`./resized/${name}`);
  let size = fs.statSync(`./resized/${name}`).size;
  // Check the size and if it was bigger than expected, run the while loop
  // And compress image until it became our desired size (Read it from .env)
  let round = 0;
  while (size > process.env.FILE_MAX_SIZE || quality >= 2) {
    quality--;
    await sharp(path)
      .jpeg({ mozjpeg: true, quality })
      .toFile(`./resized/${name}`);
    size = fs.statSync(`./resized/${name}`).size;
    if (size > process.env.FILE_MAX_SIZE) {
      // Only remove previous image if the size check doesn't pass
      fs.unlinkSync(`./resized/${name}`);
    }
    round++;
  }
  let lastLog = `${(size / 1024).toFixed(2)} KB`;
  if (size >= 1024 * 1024) {
    lastLog = `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
  logger.info(
    `New Avatar: ${firstLog} ----------- Loops: ${round} ----------- Final: ${lastLog}`
  );

  fs.unlinkSync(path);
  return `./resized/${name}`;
};
