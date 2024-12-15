const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, unique: true, required: true },
  balance: { type: Number, required: true, default: 0 },
  credits: { type: Number, default: 0 },
  debits: { type: Number, default: 0 },
});

module.exports = mongoose.model('Account', accountSchema);
