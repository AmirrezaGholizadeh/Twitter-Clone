const bcrypt = require("bcrypt");
const users = require("../database/users");

module.exports = async (req, res) => {
  try {
    const { username, password, email, confirmPassword } = req.body;

    // Check and hash the password
    const checkedPassword = await checkAndHashPassword(
      password,
      confirmPassword
    );

    if (checkedPassword) {
      // Create a new user with hashed password
      const newUser = await users.create({
        username: username,
        password: checkedPassword,
        email: email,
      });

      // Respond with a success message
      res.json("Registered");
      return;
    } else {
      throw new error("Please fill the fields carefully!");
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", error: error.message });
  }
};

// Function to check and hash the password
async function checkAndHashPassword(password, confirmPassword) {
  if (password === confirmPassword && password.length >= 8) {
    const hashedPassword = await bcrypt.hash(password, 13);
    return hashedPassword;
  }

  return false;
}
