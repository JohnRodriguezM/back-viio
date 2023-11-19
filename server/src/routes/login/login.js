const { Router } = require("express");

/**
 * Importing the login controllers for sign up and login functionality.
 * @module login
 * @requires ../../controllers/login/login.controllers
 */
const {
  signUpWithJwtAuth,
  loginWithJwtAuth,
} = require("../../controllers/login/login.controllers");

const router = Router();

router.post("/signup", signUpWithJwtAuth);
router.post("/login", loginWithJwtAuth);



module.exports = router;
