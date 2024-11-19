/** @format */
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
//get all user
const getAllUser = async (req, res) => {
  try {
    const userList = await userModel.find().select("-password");
    if (!userList) {
      return res.status(404).send({ sucess: false, message: "no user found" });
    }
    return res.status(200).send(userList);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// register a new user
const registerUser = async (req, res) => {
  try {
    let user = new userModel({
      name: req.body.name,
      email: req.body.icon,
      password: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });
    user = await user.save();
    if (!user) {
      return res.status(404).send({
        sucess: false,
        message: "user cannot be created",
      });
    }
    return res.status(201).send(category);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// get a single user
const getOneUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "user not found",
      });
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// login an existing user
const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!email) {
p    }
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = await jwt.sign(
        { userId: user.id ,
            // add more secret user information to token 
            isAdmin : user.isAdmin
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "id",
    
        }
      );
      return res.status(200).send("user authenticated");
    } else {
      return res.status(400).send("password is incorrect");
    }
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error,
    });
  }
};

// To show to the admin users in the database
const getUsersCount = async (req, res) => {
    try {
      const getUsersCount  = await userModel.countDocuments((users) => users);
      if (!getUsersCount ) {
        return res.status(500).send({ success: false });
      }
  
     return res.status(200).send({
        getUsersCount : getUsersCount ,
      });
    } catch (error) {
      res.status(500).json({
        sucess: false,
        error,
      });
    }
  };
  
// delete a user
const  deleteUser = (req, res) => {
    try {
   userModel
        .findByIdAndRemove(req.params.id)
        .then((user) => {
          if (user) {
            res
              .status(200)
              .json({ sucess: true, message: "user deleted successfully" });
          } else {
            return res
              .status(404)
              .json({ sucess: false, message: "user not found" });
          }
        })
        .catch((err) => {
          return res.status(400).json({ sucess: false, err });
        });
    } catch (error) {
      res.status(500).json({
        sucess: false,
        error,
      });
    }
  };





module.exports = {
  getAllUser,
  registerUser,
  getOneUser,
  login,
  getUsersCount ,
  deleteUser
};
