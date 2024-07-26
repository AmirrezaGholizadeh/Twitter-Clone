
module.exports = async (req, res) => {
   try {
     res.clearCookie("access_token");
     res.json({ message: "Logged out successfully" });
   } catch (error) {
     res.status(500).json({ message: "Logout error", error });
   }
};
