const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController');

const { createTransactionValidation } = require('../validations/transaction.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/transactions', createTransactionValidation, validateRequest, transactionController.createTransaction);
router.get('/transactions', transactionController.getTransactions);
router.get('/transactions/:id', transactionController.getTransactionById);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);

module.exports = router;
