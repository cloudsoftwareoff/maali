
const express = require('express');
const router = express.Router();
const Vote = require('../models/voteModel');
const User = require('../models/userModel');
const generateId = require('../tools/random_Id');
const { checkVotedStatus }= require('../middleware/CheckVoteState');
router.post('/',checkVotedStatus, async (req, res) => {
  const {  selectedCandidate, card_number } = req.body;
  voter_session=req.headers.authorization;
  const user = await User.findByCardNumber(card_number);
  if (user) {
    user.markVoted();
    await user.save();
    try {
        const newVote = new Vote({
            vote_ID:voter_session,
          
          candidate_id:selectedCandidate,
        });
    
        await newVote.save();
    
        res.status(201).json({ message: 'Vote recorded successfully' });
      } catch (error) {
        console.error('Error recording vote:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    console.log('User marked as voted:', user);
  } else {
    res.status(500).json({ error: 'User not found' });
    console.log('User not found');
  }
  
});

module.exports = router;
