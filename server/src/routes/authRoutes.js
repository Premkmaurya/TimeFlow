const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

router.get("/get-user", authenticateToken, getMe);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
