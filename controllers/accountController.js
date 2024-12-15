const Account = require('../models/account');

// Get account details by account number
exports.getAccountDetails = async (req, res, next) => {
  try {
    const account = await Account.findOne({ accountNumber: req.params.accountNumber });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};

// Create a new account
exports.createAccount = async (req, res, next) => {
  try {
    const { accountNumber, balance, credits, debits } = req.body;
    const newAccount = new Account({ accountNumber, balance, credits, debits });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    next(error);
  }
};

// Update account details (balance, credits, debits)
exports.updateAccount = async (req, res, next) => {
  try {
    const { balance, credits, debits } = req.body;
    const account = await Account.findOneAndUpdate(
      { accountNumber: req.params.accountNumber },
      { balance, credits, debits },
      { new: true }
    );
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
