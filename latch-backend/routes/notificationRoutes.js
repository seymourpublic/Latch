const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     summary: Get notifications for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of notifications
 *       500:
 *         description: Error fetching notifications
 */
router.get('/:userId', notificationController.getNotifications);

/**
 * @swagger
 * /notifications/{notificationId}/read:
 *   post:
 *     summary: Mark a notification as read
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       500:
 *         description: Error marking notification as read
 */
router.post('/:notificationId/read', notificationController.markAsRead);

module.exports = router;
