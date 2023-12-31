
const express = require('express');
const PostalCode = require('../models/laposteModel');
const router = express.Router();

router.get('/:codePostal', async (req, res) => {
  const codePostal = req.params.codePostal;
console.log(codePostal);
  try {
    // Find the postal code data based on the provided codePostal
    const postalCodeData = await PostalCode.find({ 'Code Postal': codePostal });

    if (postalCodeData) {
      res.json(postalCodeData);
    } else {
      res.status(404).json({ error: 'Postal code not found' });
    }
  } catch (error) {
    console.error('Error retrieving postal code data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
