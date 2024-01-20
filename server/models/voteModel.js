
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
  voted_at:{
    type:Date,
    required: true
  },
  electionId:{
    type:String,
    required:true
  }
});
// const calculateVotes = async () => {
//   try {
//     const voteCounts = await Vote.aggregate([
//       {
//         $group: {
//           _id: '$candidate_id',
//           votes: { $sum: 1 },
//         },
//       },
//     ]);

//     return voteCounts;
//   } catch (error) {
//     console.error('Error calculating votes:', error);
//   }
// };
const calculateVotesByHour = async (electionId) => {
  try {
    const voteCounts = await Vote.aggregate([
      {
        $match: {
          electionId: electionId,
        },
      },
      {
        $group: {
          _id: {
            hour: { $hour: '$voted_at' },
            candidate_id: '$candidate_id',
          },
          votes: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          hour: '$_id.hour',
          candidate_id: '$_id.candidate_id',
          votes: '$votes',
        },
      },
      {
        $sort: {
          hour: 1,
        },
      },
    ]);

    return voteCounts;
  } catch (error) {
    console.error('Error calculating votes by hour:', error);
    throw error;
  }
};

const Vote = mongoose.model('Vote', voteSchema);

module.exports = {Vote,calculateVotesByHour };
