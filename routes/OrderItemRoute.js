const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/OrderItemController');

router.post('/order-items', orderItemController.createOrderItem);
router.get('/order-items', orderItemController.getOrderItems);
router.get('/order-items/:id', orderItemController.getOrderItemById);
router.put('/order-items/:id', orderItemController.updateOrderItem);
router.delete('/order-items/:id', orderItemController.deleteOrderItem);

module.exports = router;
