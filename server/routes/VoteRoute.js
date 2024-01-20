
const express = require('express');
const router = express.Router();
const {Vote,calculateVotesByHour} = require('../models/voteModel');
const User = require('../models/userModel');

const { checkVotedStatus }= require('../middleware/CheckVoteState');
const ElectionModel = require('../models/electionModel');
const generateRandomId = require('../tools/randomId');



router.get('/get', async (req, res) => {
  try {

    const election = await ElectionModel.findOne();

  if (!election) {
    return res.status(404).json({ error: 'Election not found' });
  }

  const currentTime = new Date();
  const endTime = new Date(election.endTime);

  if (currentTime >= endTime) {
    const voteCounts = await calculateVotes();
    
   return res.status(200).json({ type: 'votes', data: voteCounts });

  }
  // Election is still ongoing
  const remainingTime = endTime - currentTime;
  return res.status(200).json({ type: 'remainingTime', data: { remainingTime } });
  } catch (error) {
    console.error('Error fetching candidates:', error);
   return  res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/add',checkVotedStatus, async (req, res) => {
  const {  selectedCandidate, card_number } = req.body;
  voter_session=req.headers.authorization;
  const user = await User.findByCardNumber(card_number);
  if (user) {
    

    user.markVoted();
    const voteId= generateRandomId(32);
    await user.save();
    try {
      const activeElection = await ElectionModel.getCurrentActiveElectionData();
    
    const currentTime = new Date();
        const newVote = new Vote({
          vote_ID:voteId,
          voted_at:currentTime,
          electionId:activeElection.id,
          candidate_id:selectedCandidate,
        });
    
        await newVote.save();
    
        res.status(201).json({ message: 'Vote recorded successfully' });
      } catch (error) {
        console.error('Error recording vote:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
  } else {
    res.status(500).json({ error: 'User not found' });
    
  }
  
});
router.get('/graph', async (req, res) => {
  const { electionId } = req.query;
  const elections = await ElectionModel.find().sort({ endTime: -1 });

  const lastElection = elections[0].id;
  // if (!electionId) {
  //   return res.status(400).json({ error: 'Election ID is required' });
  // }

  try {
    const votesByHour = await calculateVotesByHour(lastElection);
    res.json({ votesByHour });
  } catch (error) {
    console.error('Error fetching votes by hour:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
