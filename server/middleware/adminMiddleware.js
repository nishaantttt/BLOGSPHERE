const adminMiddleware = (req, res, next) => {
  // authMiddleware must run first and attach req.user from the JWT payload
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied: admin only" });
  }
  next();
};

module.exports = adminMiddleware;