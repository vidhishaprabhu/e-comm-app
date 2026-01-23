const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
}
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(401).json("User Not found Please register first");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        "secret",
        {
          expiresIn: "2h",
        },
      );
      return res.status(201).json({
        message: "User login successfully",
        user,
        token,
      });
    } else {
      return null;
    }
  } catch (error) {
    return res.status(500).json({ message: "There is some error while login" });
  }
}

async function editProfile(req, res) {
  try {
    const email = req.user.email;      
    const { name } = req.body;       

    const updatedUser = await User.findOneAndUpdate(
      { email },                       
      { $set: { name ,email:req.body.email} },            
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      name: updatedUser.name,
      email: updatedUser.email
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { registerUser, loginUser, editProfile };
