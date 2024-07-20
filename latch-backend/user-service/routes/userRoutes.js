const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           description: The skills of the user
 *         experience:
 *           type: string
 *           description: The experience of the user
 *         goals:
 *           type: string
 *           description: The goals of the user
 *         profilePicture:
 *           type: string
 *           description: The profile picture URL of the user
 *         coverPhoto:
 *           type: string
 *           description: The cover photo URL of the user
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: mypassword
 *         role: graduate
 *         skills: ["JavaScript", "Node.js"]
 *         experience: 5 years
 *         goals: Full-stack development
 *         profilePicture: "http://example.com/johndoe.jpg"
 *         coverPhoto: "http://example.com/coverphoto.jpg"
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Server error
 */
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /api/users/profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/profile/:id', userController.getUserProfile);

/**
 * @swagger
 * /api/users/profile/{id}:
 *   put:
 *     summary: Update user profile by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/profile/:id', userController.updateUserProfile);

/**
 * @swagger
 * /api/users/profile/{id}:
 *   delete:
 *     summary: Delete user profile by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/profile/:id', userController.deleteUserProfile);

module.exports = router;
