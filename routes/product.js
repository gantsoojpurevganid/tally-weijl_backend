const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

const {
    getProducts,
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct
} = require("../controller/product");

//"/api/v1/products"
router
  .route("/")
  .get(getProducts)
  .post(protect, authorize(1, 2), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .post(protect, authorize(1, 2), updateProduct)
  .delete(protect, authorize(1, 2), deleteProduct);

module.exports = router;