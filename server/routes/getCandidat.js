const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidatModel'); // Import your candidate model
const User = require ('../models/userModel');
const verifyAdmin = require('../middleware/verifyAdmin'); // Import your verifyAdmin middleware

router.post('/', async (req, res) => {
    const { card_number} = req.body;
    
    if(card_number!="admin"){
      const user = await User.findByCardNumber(card_number);
      
      
      if (user.voted === 'yes') {
        return res.status(403).json({ error: '' });
      }}
  try {
    const candidates = await Candidate.find();
    res.json(candidates);

   
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
