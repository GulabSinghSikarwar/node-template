const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

// Routes for Transaction operations
router.post('/', transactionController.addTransaction); // Add a credit/debit transaction
router.get('/:accountNumber', transactionController.getTransactions); // Get all transactions for an account

module.exports = router;
