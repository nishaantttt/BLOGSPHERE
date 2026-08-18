const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  likeBlog,
  addComment,
  getMyBlogs,
  deleteBlog,
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");


// 📝 CREATE BLOG
router.post("/", authMiddleware, createBlog);

// 📖 GET ALL BLOGS
router.get("/", getBlogs);

// 👤 MY BLOGS (PROFILE)
router.get("/myblogs", authMiddleware, getMyBlogs);

// ❤️ LIKE
router.put("/like/:id", authMiddleware, likeBlog);

// 💬 COMMENT
router.post("/comment/:id", authMiddleware, addComment);

// 🗑️ DELETE BLOG
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;