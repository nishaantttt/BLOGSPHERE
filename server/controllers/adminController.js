const User = require("../models/User");
const Blog = require("../models/Blog");

// GET all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE any user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await user.deleteOne();
    res.json({ msg: "User deleted by admin" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all blogs, admin view (no ownership filter)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE any blog, regardless of author (moderation)
exports.deleteBlogAdmin = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    await blog.deleteOne();
    res.json({ msg: "Blog removed by admin (moderation)" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};