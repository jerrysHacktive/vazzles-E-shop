const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getOneUser,
  getUsersCount,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/users");

//protected route(only logged in users)
router.get("/Profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.delete("/users/:id", deleteUser);

// Protected routes(admin only)
router.get("/count", getUsersCount);
router.get("/:id", getOneUser);
router.get("/", getAllUser);

module.exports = router;
