// Middleware to check if the user has voted
const User = require('../models/userModel');
const checkVotedStatus = async (req, res, next) => {
    try {
     
        const {   card_number } = req.body;
        console.log("card" +card_number);
      const user = await User.findByCardNumber(card_number);
      User.findByCardNumber(card_number)
  .then(user => {
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }
  })
  .catch(error => {
    console.error('Error finding user by card number:', error);
  });
  
      
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
  