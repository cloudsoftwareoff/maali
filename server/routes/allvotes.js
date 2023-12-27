const express = require('express');
const router = express.Router();
const { calculateVotes } = require('../models/voteModel');


router.get('/', async (req, res) => {
    try {
      const voteCounts = await calculateVotes();
      console.log('Vote counts:', voteCounts);
      res.status(200).json(voteCounts);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;