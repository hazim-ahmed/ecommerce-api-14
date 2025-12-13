const { validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors from express-validator
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation Error",
            errors: errors.array().map(err => err.msg)
        });
    }

    next();
};

module.exports = validateRequest;
