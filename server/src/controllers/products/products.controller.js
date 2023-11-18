const axios = require("axios");

const getAllProducts = async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/carts");
    const carts = response.data.carts;

    const allProducts = carts.map(cart => cart.products).flat();
    if (allProducts.length === 0) {
      res.status(404).json({ message: "No products found", data: [] });
    } else {
      res.status(200).json({ message: "Products found", data: allProducts });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
};