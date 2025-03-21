const User = require('../models/UserModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); // ✅ Fixed status typo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const user = req.body;
    const email = user.email

    //console.log(email)

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(200).json(existingUser); // Just return existing user
        }


        const result = await User.create(user);
        return res.status(201).json(result); // ✅ Added return
    } catch (error) {
        return res.status(500).json({ message: error.message }); // ✅ Added return
    }
};

module.exports = { getAllUsers, createUser };
