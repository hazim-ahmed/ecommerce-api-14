const { User } = require('../models');
const bcrypt = require('bcrypt');
const AuthTokenService = require('../services/AuthTokenService'); // Use the new service
const { Op } = require('sequelize');

const signup = async (req, res) => {
    try {
        // Validate request body
        const { user_name, email, phone, password, user_type } = req.body;

        // Input validation
        if (!user_name || !phone || !password || !user_type) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                required: ['user_name', 'phone', 'password', 'user_type']
            });
        }

        // Validate user_type
        const validUserTypes = ['customer', 'vendor', 'driver', 'admin'];
        if (!validUserTypes.includes(user_type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user_type',
                validTypes: validUserTypes
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            user_name,
            email: email || null,
            phone,
            password: hashedPassword,
            user_type,
            user_status: 'active'
        });

        // Generate and save token
        const token = await AuthTokenService.generateAndSaveToken(newUser);

        // Remove password from response
        const userObj = newUser.toJSON();
        delete userObj.password;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: userObj,
            token
        });

    } catch (error) {
        console.error("Signup Error:", error);

        // Handle specific Sequelize errors
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0]?.path || 'field';
            return res.status(409).json({
                success: false,
                message: `${field} already exists`
            });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.map(e => e.message)
            });
        }

        if (error.name === 'SequelizeConnectionError' || error.name === 'SequelizeConnectionRefusedError') {
            return res.status(503).json({
                success: false,
                message: 'Database connection error. Please try again later.'
            });
        }

        // Generic error response (don't expose internal details in production)
        res.status(500).json({
            success: false,
            message: process.env.NODE_ENV === 'production'
                ? 'Server error during registration'
                : error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Input validation
        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                required: ['identifier', 'password']
            });
        }

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
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check status
        if (user.user_status === 'blocked' || user.user_status === 'inactive') {
            return res.status(403).json({
                success: false,
                message: 'Account is not active'
            });
        }

        // Generate and save token
        const token = await AuthTokenService.generateAndSaveToken(user);

        // Remove password from response
        const userObj = user.toJSON();
        delete userObj.password;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userObj,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);

        // Handle database connection errors
        if (error.name === 'SequelizeConnectionError' || error.name === 'SequelizeConnectionRefusedError') {
            return res.status(503).json({
                success: false,
                message: 'Database connection error. Please try again later.'
            });
        }

        // Generic error response
        res.status(500).json({
            success: false,
            message: process.env.NODE_ENV === 'production'
                ? 'Server error during login'
                : error.message
        });
    }
};

const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            await AuthTokenService.revokeToken(token);
        }
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        // req.user is attached by authMiddleware
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
    logout,
    getMe
};
