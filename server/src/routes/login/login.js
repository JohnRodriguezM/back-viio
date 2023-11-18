const { Router } = require("express");

const {
  signUpWithJwtAuth,
  loginWithJwtAuth,
} = require("../../controllers/login/login.controllers");

const router = Router();

router.post("/signup", signUpWithJwtAuth);
router.post("/login", loginWithJwtAuth);



module.exports = router;
