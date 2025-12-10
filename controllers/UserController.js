const { User } = require('../models');
const bcrypt = require('bcrypt');

/**
 * Create a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createUser = async (req, res) => {
    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty or missing" });
    }

    try {
        const {
            user_name,
            phone,
            email,
            password,
            user_type,
            user_avatar,
            fcm_token
        } = req.body;

        // Basic validation for required fields
        if (!user_name || !phone || !password || !user_type) {
            return res.status(400).json({ message: "Missing required fields: user_name, phone, password, user_type" });
        }

        // Check for duplicate phone number
        const existingPhone = await User.findOne({ where: { phone } });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        // Check for duplicate email if provided
        if (email) {
            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            user_name,
            phone,
            email,
            password: hashedPassword,
            user_type,
            user_avatar,
            fcm_token,
            user_status: 'pending', // Default status
        });

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        console.error("Create User Error:", error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors.map(e => e.message)
            });
        }
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

/**
 * Get all users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Get Users Error:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

/**
 * Get a user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Get User By ID Error:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

/**
 * Update a user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`[updateUser] Updating user with ID: ${id}`);
        console.log(`[updateUser] Request Body:`, req.body);

        const user = await User.findByPk(id);

        if (!user) {
            console.log(`[updateUser] User not found`);
            return res.status(404).json({ message: "User not found" });
        }

        // Check for duplicate phone number if being updated
        if (req.body.phone && req.body.phone !== user.phone) {
            const existingPhone = await User.findOne({ where: { phone: req.body.phone } });
            if (existingPhone && existingPhone.user_id != id) {
                return res.status(400).json({ message: "Phone number already exists" });
            }
        }

        // Check for duplicate email if being updated
        if (req.body.email && req.body.email !== user.email) {
            const existingEmail = await User.findOne({ where: { email: req.body.email } });
            if (existingEmail && existingEmail.user_id != id) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }

        const updates = { ...req.body };

        // If password is being updated, hash it first
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await user.update(updates);
        console.log(`[updateUser] User updated successfully`);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Update User Error:", error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                message: "Validation Error",
                errors: error.errors.map(e => e.message)
            });
        }
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

/**
 * Delete a user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
