const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group created
 *       500:
 *         description: Error creating group
 */
router.post('/', groupController.createGroup);

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Get list of groups
 *     responses:
 *       200:
 *         description: List of groups
 *       500:
 *         description: Error fetching groups
 */
router.get('/', groupController.getGroups);

/**
 * @swagger
 * /groups/join:
 *   post:
 *     summary: Join a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *               - userId
 *             properties:
 *               groupId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Joined group
 *       500:
 *         description: Error joining group
 */
router.post('/join', groupController.joinGroup);

/**
 * @swagger
 * /groups/leave:
 *   post:
 *     summary: Leave a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - groupId
 *               - userId
 *             properties:
 *               groupId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Left group
 *       500:
 *         description: Error leaving group
 */
router.post('/leave', groupController.leaveGroup);

/**
 * @swagger
 * /groups/{groupId}/posts:
 *   post:
 *     summary: Create a forum post
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - content
 *             properties:
 *               userId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 *       500:
 *         description: Error creating post
 */
router.post('/:groupId/posts', groupController.createPost);

/**
 * @swagger
 * /groups/{groupId}/posts:
 *   get:
 *     summary: Get forum posts in a group
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: Group ID
 *     responses:
 *       200:
 *         description: List of posts
 *       500:
 *         description: Error fetching posts
 */
router.get('/:groupId/posts', groupController.getPosts);

module.exports = router;
