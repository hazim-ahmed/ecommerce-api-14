const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

const { createOrderValidation, updateOrderValidation } = require('../validations/order.validation');
const validateRequest = require('../middleware/validateRequest');

const { authenticate } = require('../middleware/authMiddleware');

router.post('/orders', authenticate, createOrderValidation, validateRequest, orderController.createOrder);
router.get('/orders', authenticate, orderController.getOrders);
router.get('/orders/:id', authenticate, orderController.getOrderById);
router.put('/orders/:id', authenticate, updateOrderValidation, validateRequest, orderController.updateOrder);
router.delete('/orders/:id', authenticate, orderController.deleteOrder);

module.exports = router;
