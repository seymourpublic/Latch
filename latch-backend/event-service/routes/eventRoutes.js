const express = require('express');
const eventController = require('../controllers/eventController');
const auth = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API to manage events
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
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
 *               - date
 *               - location
 *               - organizer
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               organizer:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 *       500:
 *         description: Server error
 */
router.post('/', auth, eventController.createEvent);

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *       500:
 *         description: Server error
 */
router.get('/', auth, eventController.getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
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
 *         description: Event details
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, eventController.getEventById);

/**
 * @swagger
 * /api/events/rsvp:
 *   post:
 *     summary: RSVP to an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - userId
 *             properties:
 *               eventId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: RSVP successful
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.post('/rsvp', auth, eventController.rsvpEvent);

module.exports = router;
