const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "handling GET reqs to /products",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "handling POST reqs to /products",
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "you have requested the special ID",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "you have requested the ID",
      id: id,
    });
  }
});
router.post("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: `You send a post request with id of ${id} `,
  });
});

module.exports = router;
