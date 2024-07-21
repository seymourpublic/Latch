const express = require('express');
const groupController = require('../controllers/groupController');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: API to manage groups
 */

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
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
 *         description: Group created successfully
 *       500:
 *         description: Server error
 */
router.post('/', auth, groupController.createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: List of all groups
 *       500:
 *         description: Server error
 */
router.get('/', auth, groupController.getGroups);

/**
 * @swagger
 * /api/groups/join:
 *   post:
 *     summary: Join a group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
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
 *         description: Joined group successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Server error
 */
router.post('/join', auth, groupController.joinGroup);

/**
 * @swagger
 * /api/groups/leave:
 *   post:
 *     summary: Leave a group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
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
 *         description: Left group successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Server error
 */
router.post('/leave', auth, groupController.leaveGroup);

/**
 * @swagger
 * /api/groups/{groupId}/posts:
 *   post:
 *     summary: Create a new post in a group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - content
 *             properties:
 *               authorId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       500:
 *         description: Server error
 */
router.post('/:groupId/posts', auth, groupController.createPost);

/**
 * @swagger
 * /api/groups/{groupId}/posts:
 *   get:
 *     summary: Get all posts in a group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all posts
 *       500:
 *         description: Server error
 */
router.get('/:groupId/posts', auth, groupController.getPosts);

module.exports = router;
