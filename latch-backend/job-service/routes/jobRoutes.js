const express = require('express');
const jobController = require('../controllers/jobController');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API to manage jobs
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - company
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Job created successfully
 *       500:
 *         description: Server error
 */
router.post('/', auth, jobController.createJob);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all jobs
 *       500:
 *         description: Server error
 */
router.get('/', auth, jobController.getJobs);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
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
 *         description: Job details
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, jobController.getJobById);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, jobController.updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete job by ID
 *     tags: [Jobs]
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
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, jobController.deleteJob);

module.exports = router;
