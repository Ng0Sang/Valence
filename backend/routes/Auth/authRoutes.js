const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  changePassword,
  forgotPassword,
} = require("../../controllers/Auth/authControllers");

router.post("/signup", signup);
router.post("/login", login);
router.post("/changepassword/:user_id", changePassword);
router.patch("/forgotpassword/:user_id", forgotPassword);

module.exports = router;
