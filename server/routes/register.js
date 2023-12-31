const express = require('express');
const User = require('../models/userModel');

const generateRandomCode = require('../tools/code');
const sendEmail = require('../models/sendEmail');
const router = express.Router();



  router.post('/', async (req, res) => {
  try {
    const { user_number, user_birthdate, user_fingerprint,user_email ,user_name,locality,Delegation,postalcode} = req.body;
    
    // Validate incoming request
    if (!user_number || !user_birthdate || !user_fingerprint || !user_email) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    

    CODE = generateRandomCode();
    sendEmail(user_email,CODE);

    const user = new User({
      cardNumber: user_number,
      birth: user_birthdate,
      fingerprint: user_fingerprint,
      code: CODE,
      user_name:user_name,
      Delegation:Delegation,
      postalcode:postalcode,
      locality:locality
    });

    await user.save();

    
    res.status(200).json({ message: 'user added' });
    
  } catch (error) {
    console.error('Error registering ID card:', error);

    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
