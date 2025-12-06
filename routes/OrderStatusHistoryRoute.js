const express = require('express');
const router = express.Router();
const orderStatusHistoryController = require('../controllers/OrderStatusHistoryController');

router.post('/order-status-histories', orderStatusHistoryController.createOrderStatusHistory);
router.get('/order-status-histories', orderStatusHistoryController.getOrderStatusHistories);
router.get('/order-status-histories/:id', orderStatusHistoryController.getOrderStatusHistoryById);
router.put('/order-status-histories/:id', orderStatusHistoryController.updateOrderStatusHistory);
router.delete('/order-status-histories/:id', orderStatusHistoryController.deleteOrderStatusHistory);

module.exports = router;
