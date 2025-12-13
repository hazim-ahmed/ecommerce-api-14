const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

const { createOrderValidation, updateOrderValidation } = require('../validations/order.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/orders', createOrderValidation, validateRequest, orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', updateOrderValidation, validateRequest, orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
