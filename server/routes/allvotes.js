const express = require('express');
const router = express.Router();
const { calculateVotes } = require('../models/voteModel');
const ElectionModel= require('../models/electionModel');

router.get('/', async (req, res) => {
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
  
  module.exports = router;