const { encrypt, decrypt } = require('../tools/cryptoUtils');
const mongoose = require('mongoose');
const {Vote} =require('./voteModel');
const candidateSchema = new mongoose.Schema({
  cin:  {
    type: String,
    required: true,
    unique: true,
  },
  electionId:{
    type: String,
    required: true,
  },
  name:  {
    type: String,
    required: true,
  
  },
  position:  {
    type: String,
    required: true,

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




candidateSchema.statics.calculateVotesByArea = async function (electionId,etype) {
                                                              
  try {
    
    const candidates = await this.find(
      {electionId}
    );
    
    const votesByArea = {};
  
    for (const candidate of candidates) {
      let areaKey;

      switch(etype){
        case "1": areaKey = candidate.location; break;
        case "2": areaKey = candidate.location.split(',')[1]; break;
        default:areaKey = "global";

      }
   
    

      if (!votesByArea[areaKey]) {
        votesByArea[areaKey] ={};
      }
      // inilition 0
      votesByArea[areaKey][candidate.cin] = {
        votes:0,
        name:candidate.name,
        photo:candidate.imageUrl,
      };
      const votes = await Vote.countDocuments({ 
        electionId, candidate_id: candidate.cin
        });
      votesByArea[areaKey][candidate.cin].votes += votes;
    }

    return votesByArea;
  } catch (error) {
    console.error('Error calculating votes by area:', error);
    throw error;
  }
};

const Candidate = mongoose.model('Candidate', candidateSchema);



module.exports = Candidate;
