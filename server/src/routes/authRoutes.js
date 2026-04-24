const express = require("express");
const { register, login, getMe, refresh, logout } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

router.get("/get-user", authenticateToken, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
