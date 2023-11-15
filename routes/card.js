const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

const {
    getCard,
    addCard,
    removeCard
} = require("../controller/card");

//"/api/v1/products"
router
  .route("/")
  .get(protect, authorize(1, 2, 3, 4, 5), getCard)
  .post(protect, authorize(1, 2, 3, 4, 5), addCard);

router
  .route("/remove")
  .post(protect, authorize(1, 2, 3, 4, 5), removeCard);

module.exports = router;