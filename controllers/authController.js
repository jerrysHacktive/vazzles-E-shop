/** @format */
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

// Helper function to remove sensitive data from user object
const sanitizeUser = (user) => {
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

// Signup function for traditional registration
exports.signUp = async (req, res) => {
  try {
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      phoneNumber: req.body.phone,
      isAdmin: req.body.isAdmin,
      provider: "local",
    });

    user = await user.save();
    const newUser = sanitizeUser(user);

    return res.status(201).json({
      success: true,
      message: "User account created successfully",
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email address already exists",
        error: "Duplicate email",
      });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user data provided",
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};

// Login function for traditional logging in
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    if (user.provider === "google" && !user.password) {
      return res.status(401).json({
        success: false,
        message:
          "This account was created with Google. Please use Google Sign-In.",
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);
    const sanitizedUser = sanitizeUser(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: sanitizedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Google OAuth login initiation
exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google OAuth callback handler
exports.googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/login?error=oauth_failed",
    },
    (err, user, info) => {
      if (err) {
        console.error("Google OAuth callback error:", err);
        return res.status(500).json({
          success: false,
          message: "Google authentication failed",
          error: err.message,
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Google authentication failed: No user found",
        });
      }

      const token = generateToken(user);
      const sanitizedUser = sanitizeUser(user);

      res.status(200).json({
        success: true,
        message: "Google login successful",
        token: token,
        user: sanitizedUser,
      });
    }
  )(req, res, next);
};

// Logout function
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error logging out",
        error: err.message,
      });
    }
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
};

