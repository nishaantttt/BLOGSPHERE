const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS
const corsOptions = {
  origin: "https://blogsphere-client-g83p.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  console.log("CONTENT-TYPE:", req.headers["content-type"]);
  console.log("BODY:", req.body);
  next();
});

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ Debug route
app.post("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({ msg: "Test working" });
});

// ✅ Protected route
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "You accessed protected route",
    user: req.user,
  });
});

// ✅ Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});