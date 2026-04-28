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
  "https://time-flow-theta.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
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
