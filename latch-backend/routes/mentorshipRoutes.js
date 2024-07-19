const express = require('express');
const mentorshipController = require('../controllers/mentorshipController');
const router = express.Router();

/**
 * @swagger
 * /mentorship/request:
 *   post:
 *     summary: Request mentorship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mentorId
 *               - menteeId
 *             properties:
 *               mentorId:
 *                 type: string
 *               menteeId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mentorship request sent
 *       500:
 *         description: Error sending request
 */
router.post('/request', mentorshipController.requestMentorship);

/**
 * @swagger
 * /mentorship/respond:
 *   post:
 *     summary: Respond to a mentorship request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestId
 *               - response
 *             properties:
 *               requestId:
 *                 type: string
 *               response:
 *                 type: string
 *                 enum: [accepted, rejected]
 *     responses:
 *       200:
 *         description: Response sent
 *       500:
 *         description: Error sending response
 */
router.post('/respond', mentorshipController.respondMentorshipRequest);

/**
 * @swagger
 * /mentorship/requests/{userId}:
 *   get:
 *     summary: Get mentorship requests for a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of mentorship requests
 *       500:
 *         description: Error fetching requests
 */
router.get('/requests/:userId', mentorshipController.getMentorshipRequests);

module.exports = router;
