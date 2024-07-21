const express = require('express');
const mentorshipController = require('../controllers/mentorshipController');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mentorships
 *   description: API to manage mentorships
 */

/**
 * @swagger
 * /api/mentorships:
 *   post:
 *     summary: Create a new mentorship
 *     tags: [Mentorships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mentor
 *               - mentee
 *               - startDate
 *               - goals
 *             properties:
 *               mentor:
 *                 type: string
 *               mentee:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               goals:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mentorship created successfully
 *       500:
 *         description: Server error
 */
router.post('/', auth, mentorshipController.createMentorship);

/**
 * @swagger
 * /api/mentorships:
 *   get:
 *     summary: Get all mentorships
 *     tags: [Mentorships]
 *     responses:
 *       200:
 *         description: List of all mentorships
 *       500:
 *         description: Server error
 */
router.get('/', auth, mentorshipController.getMentorships);

/**
 * @swagger
 * /api/mentorships/{id}:
 *   get:
 *     summary: Get mentorship by ID
 *     tags: [Mentorships]
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
 *         description: Mentorship details
 *       404:
 *         description: Mentorship not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, mentorshipController.getMentorshipById);

/**
 * @swagger
 * /api/mentorships/{id}:
 *   put:
 *     summary: Update mentorship by ID
 *     tags: [Mentorships]
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
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               goals:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, completed, cancelled]
 *     responses:
 *       200:
 *         description: Mentorship updated successfully
 *       404:
 *         description: Mentorship not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, mentorshipController.updateMentorship);

/**
 * @swagger
 * /api/mentorships/{id}:
 *   delete:
 *     summary: Delete mentorship by ID
 *     tags: [Mentorships]
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
 *         description: Mentorship deleted successfully
 *       404:
 *         description: Mentorship not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, mentorshipController.deleteMentorship);

module.exports = router;
