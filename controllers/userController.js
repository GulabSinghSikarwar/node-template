const User = require('../models/user');
const crypto =require('crypto')
// Get user details by ID
exports.getUserDetails = async (req, res, next) => {
  try {
    console.log("here ");
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error ");
    next(error);
  }
};

function generateAccountNumber() {
  return 'AC' + Date.now() + Math.floor(Math.random() * 1000);
}

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;

    // Generate a unique account number
    const accountNumber = generateAccountNumber();

    // Create a new user with the generated account number
    const newUser = new User({ name, email, phone, address, accountNumber });

    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
// Update user details
exports.updateUserDetails = async (req, res, next) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
