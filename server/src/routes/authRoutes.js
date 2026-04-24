const express = require("express");
const { register, login, getMe, refresh, logout, googleCallback } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const passport = require("passport");
const router = express.Router();

router.get("/get-user", authenticateToken, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
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
