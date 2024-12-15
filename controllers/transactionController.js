const Transaction = require('../models/transaction');
const Account = require('../models/account');

// Add a new transaction (credit/debit)
exports.addTransaction = async (req, res, next) => {
  try {
    const { accountNumber, type, amount } = req.body;

    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (type === 'debit' && account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const newTransaction = new Transaction({ accountNumber, type, amount });
    await newTransaction.save();

    if (type === 'credit') {
      account.balance += amount;
      account.credits += amount;
    } else if (type === 'debit') {
      account.balance -= amount;
      account.debits += amount;
    }

    await account.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
};

// Get all transactions for an account
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ accountNumber: req.params.accountNumber });
    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found for this account' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};
