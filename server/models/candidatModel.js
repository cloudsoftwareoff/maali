const { encrypt, decrypt } = require('../tools/cryptoUtils');

const mongoose = require('mongoose');
//const {encrypt , decrypt} = require('../tools/cryptoUtils');
const candidateSchema = new mongoose.Schema({
  cin:  {
    type: String,
    required: true,
    unique: true,
  },
  name:  {
    type: String,
    required: true,
  
  },
  position:  {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl:  {
    type: String,
    required: true,
   
  },
});



candidateSchema.pre('save', function (next) {
  // Encrypt sensitive fields before saving to the database
  this.cin = encrypt(this.cin);
  this.name = encrypt(this.name);
  this.position = encrypt(this.position);
  this.imageUrl = encrypt(this.imageUrl);
  // ... encrypt other fields if needed
  next();
});

candidateSchema.statics.decryptData = function (candidates) {
  return candidates.map(candidate => {
    return {
      name: decrypt(candidate.name),
      position: decrypt(candidate.position),
      imageUrl: decrypt(candidate.imageUrl),
      cin: candidate.cin,
    };
  });
};

const Candidate = mongoose.model('Candidate', candidateSchema);



module.exports = Candidate;
