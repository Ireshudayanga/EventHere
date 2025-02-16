const User = require('../models/UserModel')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.stetus(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    const user = req.body;
    const email = {email: user.email};
    try{
        const exitUser = await User.findOne(email);
        if(exitUser){
            res.status(400).json({message: 'User already exists'})
        }
        const result = await User.create(user);
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {getAllUsers, createUser}