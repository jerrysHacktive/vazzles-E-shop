const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "your email is required"],
    lowercase: true,
    trim: true,
    unique: [true, "user with this email already exist"],
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: function () {
      // Password is only required for local registration (non-OAuth users)
      return this.provider === "local";
    },
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: function () {
      // Phone is only required for local registration
      return this.provider === "local";
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // OAuth specific fields
  googleId: {
    type: String,
    sparse: true, // allows multiple null values but unique non-null values
  },
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("User", userSchema);
