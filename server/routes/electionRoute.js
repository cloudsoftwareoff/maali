const express = require('express');
const router = express.Router();
const ElectionModel = require('../models/electionModel');
const VerifyAdminToken = require('../middleware/verifyAdmin');

// Route to add election data
router.get('/', VerifyAdminToken,async (req, res) => {
  try {
    const {name, startTime, endTime, electionType } = req.body;

    // Validate

    // Create a new election instance
    const newElection = new ElectionModel({
        name,
        startTime,
        endTime,
        electionType
    });

    // Save the election data to the database
    const savedElection = await newElection.save();

    res.status(201).json(savedElection);
  } catch (error) {
    console.error('Error adding election data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/active', async (req, res) => {
  try {
    const election = await ElectionModel.findOne();

    if (!election) {
      return res.json({ active: false });
    }

    // Calculate remaining time
    const currentTime = new Date();
    const endTime = new Date(election.endTime);
    const remainingTime = endTime - currentTime;

    if (remainingTime > 0) {
      // Election is still active
      res.json({ active: true, election });
    } else {
      // Election has ended
      res.json({ active: false });
    }
  } catch (error) {
    console.error('Error checking active election:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/time', async (req, res) => {
    try {
      
      const election = await ElectionModel.findOne();
  
      if (!election) {
        return res.status(404).json({ error: 'Election not found' });
      }
  
      // Calculate remaining time
      const currentTime = new Date();
      const endTime = new Date(election.endTime);
      const remainingTime = endTime - currentTime;
  
      // Return the remaining time in milliseconds
      res.json({ remainingTime });
    } catch (error) {
      console.error('Error calculating remaining time:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
