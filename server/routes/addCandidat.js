const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidatModel'); 

router.post('/', async (req, res) => {
  try {
    // Request body
    const { cinNumber, name, imageUrl, position, postalcode, location,Delegation } = req.body;

    // Create a new Candidate instance
    const newCandidate = new Candidate({
      cin: cinNumber,
      name: name,
      imageUrl: imageUrl,
      position: position,
      location: location,
      postalcode: postalcode,
      Delegation:Delegation
    });

    await newCandidate.save();

    // Send a success response
    res.status(200).json({ message: 'Candidate data saved successfully' });
  } catch (error) {
    // Check if the error is due to a duplicate key violation (code 11000)
    if (error.code === 11000) {
      console.error('Error saving candidate data:', error);
      res.status(400).json({ error: 'Duplicate entry. Candidate with the same position or cinNumber already exists.' });
    } else {
      console.error('Error saving candidate data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

module.exports = router;
