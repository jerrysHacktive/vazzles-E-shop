/** @format */
const User = require("../models/users");
const logger = require("../utils/logger");

// function to get all users
exports.getAllUser = async (req, res) => {
  try {
    logger.info("Starting getAllUser function");
    logger.info("User model:", User);

    const userList = await User.find().select("-password");

    logger.info("userList result:", userList);
    logger.info(
      "userList length:",
      userList ? userList.length : "null/undefined"
    );

    if (!userList || userList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      count: userList.length,
      data: userList,
    });
  } catch (error) {
    logger.info("Error caught:", error);
    logger.info("Error message:", error.message);
    logger.info("Error stack:", error.stack);

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get any user's public info by ID - admin function
exports.getOneUser = async (req, res) => {
  try {

  const user = await User.findById(req.params.id).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// Get authenticated user's own profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update authenticated user's own profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Don't allow updating sensitive fields through this endpoint
    const { password, isAdmin, ...updateData } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { 
        new: true,           // Return updated document
        runValidators: true  // Run schema validations
      }
    ).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// function to show to the admin users in the database for admin statistics
exports.getUsersCount = async (req, res) => {
  try {
    const getUsersCount = await User.countDocuments((users) => users);
    if (!getUsersCount) {
      return res.status(500).send({ success: false });
    }

    return res.status(200).send({
      getUsersCount: getUsersCount,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// Delete user function
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


