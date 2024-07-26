const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const jwtAuthentication = (req, res, next) => {
  // Check for token in cookies
  const token = req.cookies.access_token;

  // If no token is provided, return an unauthorized status
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Add the decoded payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an unauthorized status
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = jwtAuthentication;
