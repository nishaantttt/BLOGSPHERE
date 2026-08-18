const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  getAllBlogsAdmin,
  deleteBlogAdmin,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// 👤 USER MANAGEMENT
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

// 📝 CONTENT MODERATION
router.get("/blogs", authMiddleware, adminMiddleware, getAllBlogsAdmin);
router.delete("/blogs/:id", authMiddleware, adminMiddleware, deleteBlogAdmin);

module.exports = router;