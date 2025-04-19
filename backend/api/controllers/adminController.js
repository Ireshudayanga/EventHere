const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createAdmin = async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        const savedAdmin = await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully", data: savedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Admin creation failed", error: error.message });
    }
};

const updateAdmin = async (req, res) => {
    const { id: _id } = req.params;
    const admin = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No admin with that id');

    const updatedAdmin = await Admin.findByIdAndUpdate(_id, { ...admin, _id }, { new: true });
    res.json(updatedAdmin);
}

const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No admin with that id");
    }

    try {
        await Admin.findByIdAndDelete(id);
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error while deleting admin" });
    }
};
const getAdminByEmail = async (req, res) => {
    const { email } = req.body;
  
    try {
      const admin = await Admin.findOne({ email: email.toLowerCase() });
  
      // ✅ Always return 200
      res.status(200).json({ isAdmin: !!admin }); // returns true if admin found, false if not
    } catch (error) {
      console.error("Error fetching admin:", error);
      res.status(500).json({ message: "Server error while fetching admin" });
    }
  };
  
  

module.exports = {
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAdminByEmail
};
