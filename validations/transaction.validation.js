const { body, param } = require('express-validator');
const { User } = require('../models');

const createTransactionValidation = [
    body('user_id')
        .notEmpty().withMessage('User ID is required')
        .isInt()
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) throw new Error('User not found');
        }),

    body('transaction_type')
        .notEmpty().withMessage('Transaction type is required')
        .isIn(['credit', 'debit']),

    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isFloat({ min: 0 }),

    body('balance_after')
        .notEmpty().withMessage('Balance after is required')
        .isFloat(),

    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 255 }),

    body('reference_type')
        .notEmpty().withMessage('Reference type is required')
        .isIn(['order', 'withdrawal', 'refund', 'bonus']),

    body('reference_id')
        .optional()
        .isInt()
];

module.exports = {
    createTransactionValidation
};
