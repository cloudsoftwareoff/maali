const express = require('express');
const router = express.Router();
const ElectionModel = require('../models/electionModel');
const VerifyAdminToken = require('../middleware/verifyAdmin');

const Candidate = require('../models/candidatModel');
const generateRandomId = require('../tools/randomId');
// Route election data
router.post('/', VerifyAdminToken,async (req, res) => {
  try {
    const {name, startTime, endTime, electionType } = req.body;

    // Create a new election instance
    const newElection = new ElectionModel({
      id:  generateRandomId(11),
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
    const elections = await ElectionModel.find().sort({ endTime: -1 });
    election=elections[0];
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
      
      const elections = await ElectionModel.find().sort({ endTime: -1 });

      const lastElection = elections[0];
      if (!lastElection) {
        return res.status(404).json({ error: 'Election not found' });
      }
  
      // Calculate remaining time
      const currentTime = new Date();
      const endTime = new Date(lastElection.endTime);
      const remainingTime = endTime - currentTime;
  
      // Return the remaining time in milliseconds
      res.json({ remainingTime });
    } catch (error) {
      console.error('Error calculating remaining time:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//ongoing-and-future
router.get('/ongoing', async (req, res) => {
  try {
    const elections = await ElectionModel.find().sort({ endTime: -1 });

    if (elections.length === 0) {
      return res.json({ error: 'No elections found' });
    }

    const lastElection = elections[0];
    res.json({lastElection});
  } catch (error) {
    console.error('Error fetching ongoing and future elections:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/r', async (req, res) => {
  const { electionId } = req.params;
  const elections = await ElectionModel.find().sort({ endTime: -1 });

      const lastElection = elections[0].id;
  try {
    const votes = await Candidate.calculateVotesByArea(lastElection,elections[0].electionType);
  
    res.json({ votes });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });

    
  }
});

module.exports = router;
