const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  googleAuth,
  googleCallback,
  logout,
} = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/login", login);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.post("/logout", logout);

module.exports = router;
