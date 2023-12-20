const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidatModel'); // Import your candidate model
const User = require ('../models/userModel');

// Endpoint to fetch all candidates
router.post('/', async (req, res) => {
    const { card_number} = req.body;
    console.log(card_number);
    console.log("req.body:", req.body);
    const user = await User.findByCardNumber(card_number);
  
      
      if (user.voted === 'yes') {
        return res.status(403).json({ error: 'You have already voted.' });
      }
  try {
    const candidates = await Candidate.find();
    const decryptedCandidates = Candidate.decryptData(candidates);
    res.json(decryptedCandidates)
   
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
