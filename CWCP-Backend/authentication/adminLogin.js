import Admin from "../model/adminModel.js";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ errorMessage: "Please fill in all fields" });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ errorMessage: "Admin not found" });
    }

    // Direct password comparison (not hashed)
    if (admin.password !== password) {
      return res.status(401).json({ errorMessage: "Invalid password" });
    }

    // Login success
    res.status(200).json({
      message: "Login successful",
      admin: {
        _id: admin._id,
        username: admin.username,
      },
    });

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
