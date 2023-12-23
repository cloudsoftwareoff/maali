const mongoose = require('mongoose');

const postalCodeSchema = new mongoose.Schema({
    Gouvernorat: {
    type: String,
    required: true
  },
  'Délégation': {
    type: String,
    required: true
  },
  'Localité': {
    type: String,
    required: true
  },
  'Code Postal': {
    type: String,
    required: true
  }
});

const PostalCode = mongoose.model('poste', postalCodeSchema,'poste');

module.exports = PostalCode;
