
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  vote_ID: {
    type: String,
    required: true,
    unique: true,
  },
 
  candidate_id: {
    type: String,
    required: true,
  },
});
const calculateVotes = async () => {
  try {
    const voteCounts = await Vote.aggregate([
      {
        $group: {
          _id: '$candidate_id',
          votes: { $sum: 1 },
        },
      },
    ]);

    return voteCounts;
  } catch (error) {
    console.error('Error calculating votes:', error);
  }
};


const Vote = mongoose.model('Vote', voteSchema);

module.exports = {Vote , calculateVotes};
