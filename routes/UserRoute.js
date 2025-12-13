const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { createUserValidation, updateUserValidation } = require('../validations/user.validation');
const validateRequest = require('../middleware/validateRequest');

/**
 * @route POST /api/users
 * @desc Create a new user
 * @access Public
 */
router.post('/users', createUserValidation, validateRequest, userController.createUser);

/**
 * @route GET /api/users
 * @desc Get all users
 * @access Public (Consider securing this)
 */
router.get('/users', userController.getUsers);

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Public
 */
router.get('/users/:id', userController.getUserById);

/**
 * @route PUT /api/users/:id
 * @desc Update user details
 * @access Public
 */
router.put('/users/:id', updateUserValidation, validateRequest, userController.updateUser);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user
 * @access Public
 */
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
