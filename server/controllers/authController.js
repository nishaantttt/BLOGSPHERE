const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  console.log("REGISTER HIT");
  console.log("BODY:", req.body);

  try {
    const { name, email, password } = req.body;

    // ✅ validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("User created:", user.email);

    res.status(201).json({ msg: "User registered", user });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  console.log("LOGIN HIT");
  console.log("BODY:", req.body);

  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Login successful:", user.email);

    res.json({ msg: "Login successful", token });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
};