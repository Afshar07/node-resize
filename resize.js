const fs = require("fs");
const sharp = require("sharp");
const logger = require("./logger");

module.exports = async function resize(path, name) {
  // Set quality to this at first and compress image once
  let firstSize = fs.statSync(path).size;
  logger.info(`New Avatar: ${firstSize / 1000} KB`);

  let quality = 80;
  await sharp(path)
    .jpeg({ mozjpeg: true, quality })
    .toFile(`./resized/${name}`);
  let size = fs.statSync(`./resized/${name}`).size;
  // Check the size and if it was bigger than expected, run the while loop
  // And compress image until it became our desired size (Read it from .env)
  let round = 0;
  while (size > process.env.FILE_MAX_SIZE) {
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
  if (round > 0) {
    logger.info(`${round} Loops`);
  }
  logger.info(`Final: ${size / 1000} KB`);

  fs.unlinkSync(path);
  return `./resized/${name}`;
};
