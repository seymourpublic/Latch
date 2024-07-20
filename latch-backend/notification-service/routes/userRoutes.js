const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile/:id', userController.getUserProfile);
router.put('/profile/:id', userController.updateUserProfile);
router.delete('/profile/:id', userController.deleteUserProfile);

module.exports = router;
