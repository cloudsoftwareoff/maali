const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidatModel'); 


router.post('/', async (req, res) => {
  try {
    //  request body
    const { cinNumber, name, imageUrl, position } = req.body;

    // Create a new Candidate instance
    const newCandidate = new Candidate({
      cin:cinNumber,
      name:name,
      imageUrl:imageUrl,
      position:position,
    });

    await newCandidate.save();

    // Send a success response
    res.status(200).json({ message: 'Candidate data saved successfully' });
  } catch (error) {
    console.error('Error saving candidate data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
