const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


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

    const token = jwt.sign({
      id: newUser._id,
      role: newUser.role,
      email: newUser.email,
    }, process.env.JWT_SECRET, { expiresIn: "7d"});

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
  
    res.status(201).json({
      message: "User registered successfully",
      token,
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

    const token = jwt.sign({
      id: user._id,
      role: user.role,
      email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: "7d"});

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      token,
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
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

const refresh = async (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const newToken = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Token refreshed", token: newToken });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

const googleCallback = async (req, res) => {
  try {
    const user = req.user;

    const isUserExists = await User.findOne({
      $or: [{ googleId: user.id }, { email: user.emails[0].value }],
    });

    let userData;

    if (!isUserExists) {
      const newUser = new User({
        googleId: user.id,
        firstName: user.name.givenName,
        lastName: user.name.familyName,
        email: user.emails[0].value,
      });
      await newUser.save();
      userData = newUser;
    } else {
      userData = isUserExists;
    }
    const token = jwt.sign(
      {
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(
      `${process.env.FRONTEND_URL || "http://localhost:5173"}/oauth-success?token=${token}`,
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Google authentication failed", error });
  }
};

module.exports = { register, login, getMe, logout, refresh, googleCallback };
