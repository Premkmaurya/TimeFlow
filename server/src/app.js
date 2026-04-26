const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const passport = require("passport");

const authRoutes = require("./routes/authRoutes");
const overtimeRoutes = require("./routes/overtimeRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  ...(process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : []),
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/overtime", overtimeRoutes);
app.use("/api/notifications", notificationRoutes);

require("./config/passport");
app.use(passport.initialize());

// ✅ good
app.get("/health", (req, res) => {
  res.send("OK");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Something went wrong!", message: err.message });
});

module.exports = app;
