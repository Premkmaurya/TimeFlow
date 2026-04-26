const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
  
  const cookieOptions = {
    httpOnly: true,
    secure: true, // Always true for HTTPS (Vercel)
    sameSite: "none", // Required for cross-site cookies on Vercel
    maxAge: 15 * 60 * 1000,
  };

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    const { accessToken, refreshToken } = generateTokens(newUser);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    if (!user.password) {
        return res.status(400).json({ message: "This account was created with Google. Please use Google Login." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    setCookies(res, accessToken, refreshToken);

    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET,
    );
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    setCookies(res, accessToken, refreshToken);

    res.status(200).json({ message: "Token refreshed" });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

const googleCallback = (req, res) => {
  try {
    const { accessToken, refreshToken } = generateTokens(req.user);
    setCookies(res, accessToken, refreshToken);
    
    // Redirect to frontend dashboard
    const frontendUrl = "https://time-flow-theta.vercel.app";
    res.redirect(`${frontendUrl}/dashboard`);
  } catch (err) {
    const frontendUrl = "https://time-flow-theta.vercel.app";
    res.redirect(`${frontendUrl}/login?error=auth_failed`);
  }
};

module.exports = { register, login, getMe, logout, refresh, googleCallback };
