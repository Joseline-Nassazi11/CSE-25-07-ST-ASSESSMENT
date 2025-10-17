const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// --- GET ROUTES ---

// Login page
router.get("/", (req, res) => res.render("login"));

// Signup page
router.get("/signup", (req, res) => res.render("signup"));

// Success page
router.get("/success", (req, res) => res.render("success"));

// --- POST ROUTES ---

// Signup POST
router.post("/signup", async (req, res) => {
  const { fullName, email, phoneNumber, password, confirmPassword } = req.body;

  try {
    // 1. Validate fields
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      return res.send("All fields are required.");
    }

    if (password !== confirmPassword) {
      return res.send("Passwords do not match.");
    }

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("Email already registered. Please login.");
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save new user
    const user = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await user.save();

    res.redirect("/"); // Redirect to login
  } catch (error) {
    console.error(error);
    res.send("Error creating account");
  }
});

// Login POST
router.post("/", async (req, res) => {
  const { username, password } = req.body; // username is email or phone

  try {
    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: username }, { phoneNumber: username }],
    });

    if (!user) return res.send("Invalid credentials");

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid credentials");

    res.redirect("/success");
  } catch (error) {
    console.error(error);
    res.send("Login error");
  }
});

module.exports = router;
