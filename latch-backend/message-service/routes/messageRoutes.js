const express = require('express');
const messageController = require('../controllers/messageController');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API to manage messages
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender
 *               - receiver
 *               - content
 *             properties:
 *               sender:
 *                 type: string
 *               receiver:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       500:
 *         description: Server error
 */
router.post('/', auth, messageController.sendMessage);

/**
 * @swagger
 * /api/messages/user/{userId}:
 *   get:
 *     summary: Get all messages for a user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all messages
 *       500:
 *         description: Server error
 */
router.get('/user/:userId', auth, messageController.getMessagesByUser);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get message by ID
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message details
 *       404:
 *         description: Message not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, messageController.getMessageById);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Delete message by ID
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, messageController.deleteMessage);

module.exports = router;
