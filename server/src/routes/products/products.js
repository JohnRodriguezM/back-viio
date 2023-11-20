const { Router } = require("express");
/**
 * Retrieves all products.
 * @function getAllProducts
 * @returns {Array} Array of products.
 */
const {
  getAllProducts,
  getFilteredProducts,
} = require("../../controllers/products/products.controller");

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/search", getFilteredProducts);

module.exports = router;
