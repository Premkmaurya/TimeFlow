const express = require("express");
const { register, login, getMe, logout, googleCallback } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const passport = require("passport");
const router = express.Router();

router.get("/getMe", authenticateToken, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  googleCallback
);

module.exports = router;
