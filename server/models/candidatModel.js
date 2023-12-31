const { encrypt, decrypt } = require('../tools/cryptoUtils');
const mongoose = require('mongoose');

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
  location:{
    type: String,
    required: true,
  },
  postalcode:{
    type: String,
    required: true,
  },
  Delegation:{
    type: String,
    required: true,
  }
});



candidateSchema.pre('save', function (next) {
  
  this.cin = encrypt(this.cin);
  
  
  next();
});

candidateSchema.statics.decryptData = function (candidates) {
  return candidates.map(candidate => {
    return {
    
      cin: candidate.cin,
    };
  });
};

const Candidate = mongoose.model('Candidate', candidateSchema);



module.exports = Candidate;
