const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Login page
router.get("/", (req, res) => res.render("login"));

// Signup page
router.get("/signup", (req, res) => res.render("signup"));

// Signup form POST
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists. Please login.");
    }

    const user = new User({ username, email, password });
    await user.save();
    res.redirect("/"); // Redirect to login after signup
  } catch (error) {
    console.error(error);
    res.send("Error creating account");
  }
});

// Login form POST
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.send("Invalid username or password");
    }

    // Successful login
    res.redirect("/success");
  } catch (error) {
    console.error(error);
    res.send("Login error");
  }
});

// Success page
router.get("/success", (req, res) => res.render("success"));

module.exports = router;
