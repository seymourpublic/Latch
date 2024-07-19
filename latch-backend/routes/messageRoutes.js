const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *               - senderId
 *               - content
 *             properties:
 *               conversationId:
 *                 type: string
 *               senderId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent
 *       500:
 *         description: Error sending message
 */
router.post('/', messageController.sendMessage);

/**
 * @swagger
 * /messages/{conversationId}:
 *   get:
 *     summary: Get messages in a conversation
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: List of messages
 *       500:
 *         description: Error fetching messages
 */
router.get('/:conversationId', messageController.getMessages);

/**
 * @swagger
 * /conversations/{userId}:
 *   get:
 *     summary: Get conversations for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of conversations
 *       500:
 *         description: Error fetching conversations
 */
router.get('/conversations/:userId', messageController.getConversations);

module.exports = router;
