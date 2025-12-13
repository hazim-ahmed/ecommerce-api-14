const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../validations/auth.validation');
const validateRequest = require('../middleware/validateRequest');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/auth/signup', signupValidation, validateRequest, authController.signup);
router.post('/auth/login', loginValidation, validateRequest, authController.login);
router.get('/auth/me', authenticate, authController.getMe);

module.exports = router;
