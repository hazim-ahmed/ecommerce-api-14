const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');

const { createNotificationValidation, updateNotificationValidation } = require('../validations/notification.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/notifications', createNotificationValidation, validateRequest, notificationController.createNotification);
router.get('/notifications', notificationController.getNotifications);
router.get('/notifications/:id', notificationController.getNotificationById);
router.put('/notifications/:id', updateNotificationValidation, validateRequest, notificationController.updateNotification);
router.delete('/notifications/:id', notificationController.deleteNotification);

module.exports = router;
