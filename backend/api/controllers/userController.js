const User = require("../models/UserModel");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or return existing user
const createUser = async (req, res) => {
  const { email, name } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(200).json(user);

    user = await User.create({ name, email });
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Promote to admin
const promoteToAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await User.findByIdAndUpdate(id, { role: "admin" }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle ban/suspend
const toggleStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = user.status === "active" ? "banned" : "active";
    await user.save();

    res.status(200).json({ message: `User is now ${user.status}`, data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  promoteToAdmin,
  deleteUser,
  toggleStatus,
};
