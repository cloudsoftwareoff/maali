// Middleware to check if the user has voted
const User = require('../models/userModel');
const checkVotedStatus = async (req, res, next) => {
    try {
     
        const {   card_number } = req.body;
       
      const user = await User.findByCardNumber(card_number);
      User.findByCardNumber(card_number);
      if (user.voted === 'yes') {
        return res.status(403).json({ error: 'You have already voted.' });
      }
      next();
    } catch (error) {
      console.error('Error checking voted status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { checkVotedStatus };
  