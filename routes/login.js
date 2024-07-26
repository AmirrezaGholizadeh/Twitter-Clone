const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const users = require("../database/users");

dotenv.config(); // Load environment variables from .env file

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const member = await users.findOne({ username: username }).lean();

    if (!member) {
      throw new Error("User not found");
    }

    // Compare provided password with the stored hashed password
    const comparedPassword = await bcrypt.compare(password, member.password);

    if (!comparedPassword) {
      throw new Error("Incorrect password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: member._id, username: member.username },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Set the JWT token in cookies
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Respond with the token and user information
    return res.json({ token, userID: member._id, username: member.username });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Invalid login credentials" });
  }
};
