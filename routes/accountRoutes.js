const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

// Routes for Account operations
router.get('/:accountNumber', accountController.getAccountDetails); // Get account by account number
router.post('/', accountController.createAccount); // Create a new account
router.put('/:accountNumber', accountController.updateAccount); // Update account (balance, credits, debits)

module.exports = router;
