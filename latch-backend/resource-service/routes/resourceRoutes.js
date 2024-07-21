const express = require('express');
const resourceController = require('../controllers/resourceController');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: API to manage resources
 */

/**
 * @swagger
 * /api/resources:
 *   post:
 *     summary: Upload a new resource
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - file
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Resource uploaded successfully
 *       500:
 *         description: Server error
 */
router.post('/', auth, resourceController.uploadResource);

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Get all resources
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: List of all resources
 *       500:
 *         description: Server error
 */
router.get('/', auth, resourceController.getResources);

/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: Get resource by ID
 *     tags: [Resources]
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
 *         description: Resource details
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, resourceController.getResourceById);

/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: Delete resource by ID
 *     tags: [Resources]
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
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, resourceController.deleteResource);

module.exports = router;
