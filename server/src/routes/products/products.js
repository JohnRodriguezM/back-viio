const { Router } = require("express");
/**
 * Retrieves all products.
 * @function getAllProducts
 * @returns {Array} Array of products.
 */
const {
  getAllProducts,
} = require("../../controllers/products/products.controller");

const router = Router();

router.get("/products", getAllProducts);

module.exports = router;
