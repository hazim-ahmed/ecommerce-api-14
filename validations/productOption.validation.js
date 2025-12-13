const { body, param } = require('express-validator');
const { Product } = require('../models');

const createProductOptionValidation = [
    body('product_id')
        .notEmpty().withMessage('Product ID is required')
        .isInt().withMessage('Product ID must be an integer')
        .custom(async (value) => {
            const product = await Product.findByPk(value);
            if (!product) throw new Error('Product not found');
        }),

    body('option_name')
        .trim()
        .notEmpty().withMessage('Option name is required')
        .isLength({ max: 100 }),

    body('option_type')
        .notEmpty().withMessage('Option type is required')
        .isIn(['single', 'multiple']).withMessage('Invalid option type'),

    body('option_values')
        .notEmpty().withMessage('Option values are required')
    // .isJSON() // Optional: if sent as stringified JSON
];

const updateProductOptionValidation = [
    param('id').isInt().withMessage('Invalid option ID'),

    body('option_name')
        .optional()
        .trim()
        .notEmpty(),

    body('option_type')
        .optional()
        .isIn(['single', 'multiple'])
];

module.exports = {
    createProductOptionValidation,
    updateProductOptionValidation
};
