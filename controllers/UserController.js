const { User } = require('../models');
const bcrypt = require('bcrypt');

/**
 * Create a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createUser = async (req, res) => {
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
        // Keep DB constraint error handling just in case
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

        const user = await User.findByPk(id);

        if (!user) {
            console.log(`[updateUser] User not found`);
            return res.status(404).json({ message: "User not found" });
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
