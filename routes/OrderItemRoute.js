const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/OrderItemController');

const { createOrderItemValidation, updateOrderItemValidation } = require('../validations/orderItem.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/order-items', createOrderItemValidation, validateRequest, orderItemController.createOrderItem);
router.get('/order-items', orderItemController.getOrderItems);
router.get('/order-items/:id', orderItemController.getOrderItemById);
router.put('/order-items/:id', updateOrderItemValidation, validateRequest, orderItemController.updateOrderItem);
router.delete('/order-items/:id', orderItemController.deleteOrderItem);

module.exports = router;
