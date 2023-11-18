const { Router } = require("express");

/*const {
  signUpWithJwtAuth,
  loginWithJwtAuth,
} = require("../../controllers/login/login.controllers");*/

const {
  getAllProducts,
} = require("../../controllers/products/products.controller");

const router = Router();

router.get("/products", getAllProducts);

module.exports = router;
