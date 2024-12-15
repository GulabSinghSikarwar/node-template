const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Routes for User operations
router.get('/:id', userController.getUserDetails); // Get user by ID
router.post('/', userController.createUser); // Create a new user
router.put('/:id', userController.updateUserDetails); // Update user details

module.exports = router;
