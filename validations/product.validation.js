const { body, param } = require('express-validator');
const { Product, Store, ProductCategory } = require('../models');

const createProductValidation = [
    body('store_id')
        .notEmpty().withMessage('Store ID is required')
        .isInt().withMessage('Store ID must be an integer')
        .custom(async (value) => {
            const store = await Store.findByPk(value);
            if (!store) throw new Error('Store not found');
        }),

    body('product_category_id')
        .notEmpty().withMessage('Product Category ID is required')
        .isInt().withMessage('Product Category ID must be an integer')
        .custom(async (value) => {
            const category = await ProductCategory.findByPk(value);
            if (!category) throw new Error('Product Category not found');
        }),

    body('product_name')
        .trim()
        .notEmpty().withMessage('Product name is required')
        .isLength({ max: 150 }).withMessage('Product name must not exceed 150 characters'),

    body('product_description')
        .optional()
        .isString().withMessage('Description must be a string'),

    body('product_price')
        .notEmpty().withMessage('Product price is required')
        .isFloat({ min: 0 }).withMessage('Product price must be a positive number'),

    body('discount_price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Discount price must be a positive number')
        .custom((value, { req }) => {
            if (parseFloat(value) > parseFloat(req.body.product_price)) {
                throw new Error('Discount price cannot be greater than product price');
            }
            return true;
        }),

    body('product_images')
        .optional(),

    body('product_stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

    body('product_status')
        .optional()
        .isIn(['active', 'inactive']).withMessage('Invalid product status'),

    body('is_featured')
        .optional()
        .isBoolean().withMessage('is_featured must be boolean')
];

const updateProductValidation = [
    param('id')
        .isInt().withMessage('Invalid product ID'),

    body('store_id')
        .optional()
        .isInt().withMessage('Store ID must be an integer')
        .custom(async (value) => {
            const store = await Store.findByPk(value);
            if (!store) throw new Error('Store not found');
        }),

    body('product_category_id')
        .optional()
        .isInt().withMessage('Product Category ID must be an integer')
        .custom(async (value) => {
            const category = await ProductCategory.findByPk(value);
            if (!category) throw new Error('Product Category not found');
        }),

    body('product_name')
        .optional()
        .trim()
        .notEmpty().withMessage('Product name cannot be empty')
        .isLength({ max: 150 }).withMessage('Product name must not exceed 150 characters'),

    body('product_price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Product price must be a positive number'),

    body('discount_price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Discount price must be a positive number'),

    body('product_status')
        .optional()
        .isIn(['active', 'inactive']).withMessage('Invalid product status'),

    body('is_featured')
        .optional()
        .isBoolean()
];

module.exports = {
    createProductValidation,
    updateProductValidation
};
