const axios = require("axios");

/**
 * Retrieves all products from the server.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the products are retrieved.
 */
const getAllProducts = async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/carts");
    const carts = response.data.carts;

    const allProducts = carts.reduce((acc, cart) => [...acc, ...cart.products], []);
    if (allProducts.length === 0) {
      res.status(404).json({ message: "No products found", data: [] });
    } else {
      res.status(200).json({ message: "Products found", data: allProducts });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Retrieves filtered products based on the provided title.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the filtered products are sent as a response.
 */
const getFilteredProducts = async (req, res) => {
  try {
    const { title } = req.query;
    const response = await axios.get("https://dummyjson.com/carts");
    const carts = response.data.carts;

    const allProducts = carts.reduce((acc, cart) => [...acc, ...cart.products], []);
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      res.status(404).json({ message: "No products found", data: [] });
    } else {
      res
        .status(200)
        .json({ message: "Products found", data: filteredProducts });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAllProducts,
  getFilteredProducts,
};
