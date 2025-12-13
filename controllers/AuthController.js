const { User } = require('../models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const { Op } = require('sequelize');

const signup = async (req, res) => {
    try {
        const { user_name, email, phone, password, user_type } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            user_name,
            email,
            phone,
            password: hashedPassword,
            user_type,
            user_status: 'active'
        });

        const token = generateToken(newUser);

        const userObj = newUser.toJSON();
        delete userObj.password;

        res.status(201).json({
            message: 'User registered successfully',
            user: userObj,
            token
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Removed debugLog for production

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Find user by email or phone
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: identifier },
                    { phone: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check status
        if (user.user_status === 'blocked' || user.user_status === 'inactive') {
            return res.status(403).json({ message: 'Account is not active' });
        }

        const token = generateToken(user);

        const userObj = user.toJSON();
        delete userObj.password;

        res.status(200).json({
            message: 'Login successful',
            user: userObj,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.user_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const userObj = user.toJSON();
        delete userObj.password;

        res.status(200).json(userObj);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    signup,
    login,
    getMe
};
