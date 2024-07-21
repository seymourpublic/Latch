const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerSetup = require('./swagger');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Enable CORS
app.use(cors());

// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Swagger setup
swaggerSetup(app);

// Proxy configuration
const proxyOptions = (target) => ({
    target,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // Add custom headers or other configurations here
    },
    onError: (err, req, res) => {
        res.status(500).json({ error: 'Proxy error', details: err.message });
    }
});

// Define service routes
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Successfully created
 */
app.use('/api/users', createProxyMiddleware(proxyOptions(process.env.USER_SERVICE_URL)));

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Retrieve a list of groups
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *   post:
 *     summary: Create a new group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Developers Group"
 *     responses:
 *       201:
 *         description: Successfully created
 */
app.use('/api/groups', createProxyMiddleware(proxyOptions(process.env.GROUP_SERVICE_URL)));

/**
 * @swagger
 * /api/mentorships:
 *   get:
 *     summary: Retrieve a list of mentorships
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *   post:
 *     summary: Create a new mentorship
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mentorId:
 *                 type: string
 *                 example: "1"
 *               menteeId:
 *                 type: string
 *                 example: "2"
 *     responses:
 *       201:
 *         description: Successfully created
 */
app.use('/api/mentorships', createProxyMiddleware(proxyOptions(process.env.MENTORSHIP_SERVICE_URL)));

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Retrieve a list of jobs
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *   post:
 *     summary: Create a new job
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Software Engineer"
 *               description:
 *                 type: string
 *                 example: "Develop and maintain software"
 *               company:
 *                 type: string
 *                 example: "Tech Corp"
 *               location:
 *                 type: string
 *                 example: "New York"
 *               salary:
 *                 type: number
 *                 example: 120000
 *     responses:
 *       201:
 *         description: Successfully created
 */
app.use('/api/jobs', createProxyMiddleware(proxyOptions(process.env.JOB_SERVICE_URL)));

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve a list of events
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hackathon"
 *               description:
 *                 type: string
 *                 example: "A hackathon event"
 *               date:
 *                 type: string
 *                 example: "2023-09-30"
 *     responses:
 *       201:
 *         description: Successfully created
 */
app.use('/api/events', createProxyMiddleware(proxyOptions(process.env.EVENT_SERVICE_URL)));

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Retrieve a list of resources
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *   post:
 *     summary: Create a new resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "JavaScript Basics"
 *               url:
 *                 type: string
 *                 example: "http://example.com/js-basics"
 *     responses:
 *       201:
 *         description: Successfully created
 */
app.use('/api/resources', createProxyMiddleware(proxyOptions(process.env.RESOURCE_SERVICE_URL)));

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *   post:
 *     summary: Send a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: string
 *                 example: "1"
 *               receiverId:
 *                 type: string
 *                 example: "2"
 *               content:
 *                 type: string
 *                 example: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Successfully sent
 */
app.use('/api/messages', createProxyMiddleware(proxyOptions(process.env.MESSAGE_SERVICE_URL)));

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Retrieve a list of notifications
 *     responses:
 *       200:
 *         description: Successfully retrieved list
 *   post:
 *     summary: Create a new notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "1"
 *               message:
 *                 type: string
 *                 example: "You have a new message"
 *     responses:
 *       201:
 *         description: Successfully created
 */
app.use('/api/notifications', createProxyMiddleware(proxyOptions(process.env.NOTIFICATION_SERVICE_URL)));

// Start the server
app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
